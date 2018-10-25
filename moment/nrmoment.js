/**
* Copyright (c) 2018 Julian Knight (Totally Information)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

// Node for Node-Red that outputs a nicely formatted string from a date/time
// object or string using the moment.js library.

// require moment.js (must be installed from package.js as a dependency)
var moment      = require('moment-timezone');
var parseFormat = require('moment-parseformat');
var osLocale    = require('os-locale');
var hostTz      = moment.tz.guess();
var hostLocale  = osLocale.sync();


// Module name must match this nodes html file
var moduleName = 'moment';

module.exports = function(RED) {
  'use strict';

  // The main node definition - most things happen in here
  function nodeGo(config) {
    // Create a RED node
    RED.nodes.createNode(this,config);

    // Store local copies of the node configuration (as defined in the .html)
    this.topic = config.topic;
    this.input = config.input || 'payload'; // where to take the input from
    this.inputType = config.inputType || 'msg'; // msg, flow, global, timestamp or string
    this.fakeUTC = config.fakeUTC || false; // is the input UTC rather than local date/time?
    this.adjAmount = config.adjAmount || 0; // number
    this.adjType = config.adjType || 'days'; // days, hours, etc.
    this.adjDir = config.adjDir || 'add'; // add or subtract
    this.format = config.format || ''; // valid moment.js format string
    this.locale = config.locale || false // valid moment.js locale string
    this.output = config.output || 'payload'; // where to put the output
    this.outputType = config.outputType || 'msg'; // msg, flow or global
    this.inTz = config.inTz || false; // timezone, '' or zone name, e.g. Europe/London
    this.outTz = config.outTz || this.inTz; // timezone, '' or zone name, e.g. Europe/London

    // copy "this" object in case we need it in context of callbacks of other functions.
    var node = this;

    // respond to inputs....
    node.on('input', function (msg) {
      'use strict'; // We will be using eval() so lets get a bit of safety using strict

      // If the node's topic is set, copy to output msg
      if ( node.topic !== '' ) {
        msg.topic = node.topic;
      } // If nodes topic is blank, the input msg.topic is already there

      // make sure output property is set, if not, assume msg.payload
      if ( node.output === '' ) {
        node.output = 'payload';
        //node.warn('Output field is REQUIRED, currently blank, set to payload');
      }
      if ( node.outputType === '' ) {
        node.outputType = 'msg';
        node.warn('Output Type field is REQUIRED, currently blank, set to msg');
      }

      // If the input property is blank, assume NOW as the required timestamp
      // or make sure that the node's input property actually exists on the input msg
      var inp = '';
      // If input is a blank string, use a Date object with Now DT
      if ( node.input === '' ) {
        inp = new Date();
      } else {
        // Otherwise, check which input type & get the input
        try {
          switch ( node.inputType ) {
            case 'msg':
              inp = RED.util.getMessageProperty(msg, node.input);
              break;
            case 'flow':
              inp = node.context().flow.get(node.input);
              break;
            case 'global':
              inp = node.context().global.get(node.input);
              break;
            case 'date':
              inp = new Date();
              break;
            case 'str':
              inp = node.input.trim();
              break;
            default:
              inp = new Date();
              node.warn('Unrecognised Input Type, ' + node.inputType + '. Output has been set to NOW.');
          }
        } catch (err) {
          inp = new Date();
          node.warn('Input property, ' + node.inputType + '.' + node.input + ', does NOT exist. Output has been set to NOW.');
        }
      }
      // We are going to overwrite the output property without warning or permission!

      // Final check for input being a string (which moment doesn't really want to handle)
      // NB: moment.js v3 will stop accepting strings. v2.7+ throws a warning.
      var dtHack = '', inpFmt = '';
      // @from v3 2018-09-23: If input is `null`, change to empty string
      if ( inp === null ) inp = '';
      if ( (typeof inp) === 'string' ) {
        inp = inp.trim();
        // Some string input hacks
        switch (inp.toLowerCase()) {
          case 'today':
            inp = new Date();
            break;
          case 'yesterday':
            inp = new Date();
            dtHack = {days:-1};
            break;
          case 'tomorrow':
            inp = new Date();
            dtHack = {days:+1};
            break;
          default:
            var prefOrder = {preferredOrder: {'/': 'DMY', '.': 'DMY', '-': 'YMD'} };
            if ( (node.locale.toLowerCase().replace('-','_') === 'en_US') || (node.inTz.split('/')[0] === 'America') ) {
              prefOrder = {preferredOrder: {'/': 'MDY', '.': 'DMY', '-': 'YMD'} };
            }
            inpFmt = parseFormat(inp, prefOrder);
        }
      } else if ( (typeof inp) === 'number' ) {
        // @from 2017-06-15 IF inp is a number at this point, it needs turning into a date object
        inp = new Date(inp)
      }

      // At this point, `inp` SHOULD be a Date object and safe to pass to moment.js

      if ( !node.inTz ) { node.inTz = hostTz; }
      if ( !node.outTz ) { node.outTz = node.inTz; }
      // Validate input and output timezones - @since 2.0.4
      if ( moment.tz.zone(node.inTz) === null ) {
        // tz invalid, warn and set to UTC
        node.warn('Moment: Input Timezone Invalid, reset to UTC - see http://momentjs.com/timezone/docs/#/data-loading/')
        node.inTz = 'UTC'
      }
      if ( moment.tz.zone(node.outTz) === null ) {
        // tz invalid, warn and set to UTC
        node.warn('Moment: Output Timezone Invalid, reset to UTC - see http://momentjs.com/timezone/docs/#/data-loading/')
        node.outTz = 'UTC'
      }

      // Get a Moment.JS date/time - NB: the result might not be
      //  valid since the input might not parse as a date/time
      var mDT;
      if ( inpFmt !== '' ) {
        mDT = moment.tz(inp, inpFmt, true, node.inTz);
      } else {
        // @from 2017-06-15 change to momentjs meant having to add null parameter
        mDT = moment.tz(inp, null, true, node.inTz)
      }

      // Fallback to JS built-in Date parsing, if not recognized by moment
      if (!mDT.isValid()) {
        var dtm = new Date(inp);
        if (dtm === 'Invalid Date') {
          node.warn('Unrecognized date string format => ' + inp);
        }
        else {
          mDT = moment(dtm);
        }
      }

      // Adjust the date for input hacks if needed (e.g. input was "yesterday" or "tommorow")
      if ( dtHack !== '' ) { mDT.add(dtHack); }

      // JK: Added OS locale lookup
      if ( !node.locale ) { node.locale = hostLocale; }
      // JK: Add a trap to Jaques44's locale code in case the output locale string is invalid
      try {
        // Jacques44 - set locale for localised output formats
        mDT.locale(node.locale);
      } catch (err) {
        node.warn('Locale string invalid - check moment.js for valid strings');
      }

      // Adjust the input date if required
      if ( node.adjAmount !== 0 ) {
        // check if measure is valid
        if ( isMeasureValid(node.adjType) ) {
          // NB: moments are mutable so don't need to reassign
          if ( node.adjDir === 'subtract') {
            mDT.subtract(node.adjAmount, node.adjType);
          } else {
            mDT.add(node.adjAmount, node.adjType);
          }
        } else {
          // it isn't valid so warn and don't adjust
          node.warn('Adjustment measure type not valid, no adjustment made - check moment.js docs for valid measures (days, hours, etc)');
        }
      }

      // ==== NO MORE DATE/TIME CALCULATIONS AFTER HERE ==== //

      // If required, change to the output Timezone
      if ( node.outTz !== '' ) mDT.tz(node.outTz);

      // Check if the input is a date?
      if ( ! mDT.isValid() ) {
        // THIS SHOULD NEVER BE CALLED - it left to catch the occasional error
        node.warn('The input property was NOT a recognisable date. Output will be a blank string');
        setOutput(msg, node.outputType, node.output, '');
      } else {
        // Handle different format strings. We allow any fmt str that
        // Moment.JS supports but also some special formats

        // If format not set, assume ISO8601 string if input is a Date otherwise assume Date
        switch ( node.format.toLowerCase() ) {
          case '':
          case 'iso8601':
          case 'iso':
            // Default to ISO8601 string
            setOutput(msg, node.outputType, node.output, mDT.toISOString());
            break;
          case 'fromnow':
          case 'timeago':
            // We are also going to handle time-from-now (AKA time ago) format
            setOutput(msg, node.outputType, node.output, mDT.fromNow());
            break;
          case 'calendar':
          case 'aroundnow':
            // We are also going to handle calendar format (AKA around now)
            // Force dates >1 week from now to be in ISO instead of US format
            setOutput(msg, node.outputType, node.output, mDT.calendar(null,{sameElse:'YYYY-MM-DD'}));
            break;
          case 'date':
          case 'jsdate':
            // we also allow output as a Javascript Date object
            setOutput(msg, node.outputType, node.output, mDT.toDate());
            break;
          case 'object':
            // we also allow output as a Javascript Date object
            setOutput(msg, node.outputType, node.output, mDT.toObject());
            break;
          default:
            // or we assume it is a valid format definition ...
            setOutput(msg, node.outputType, node.output, mDT.format(node.format));
        }
      }

      // Send the output message
      node.send(msg);
    });

    // Tidy up if we need to
    //node.on('close', function() {
      // Called when the node is shutdown - eg on redeploy.
      // Allows ports to be closed, connections dropped etc.
      // eg: node.client.disconnect();
    //});

    // Set the appropriate output variable
    function setOutput(msg, outputType, output, value) {
      try {
        switch ( outputType ) {
          case 'msg':
            RED.util.setMessageProperty(msg, output, value);
            break;
          case 'flow':
            node.context().flow.set(output, value);
            break;
          case 'global':
            node.context().global.set(output, value);
            break;
          default:
            node.warn('Unrecognised Output Type, ' + outputType + '. No output.');
        }
      } catch (err) {
        node.warn('Output property, ' + outputType + '.' + output + ', cannot be set. No output.', err);
      }
    } // --- end of setOutput function --- //

    // Is the date/time adjustment type (measure) valid? See moment.js docs
    function isMeasureValid(adjType) {
      var validTypes = ['years','y','quarters','Q','months','M','weeks','w','days','d','hours','h','minutes','m','seconds','s','milliseconds','ms'];
      //return validTypes.includes(adjType);
      return validTypes.indexOf(adjType) > -1;
    } // --- end of isMeasureValid function --- //

  } // ---- end of nodeGo function ---- //

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType(moduleName,nodeGo);

  // Create API listener: sends the host locale & timezone to the admin ui
  // NB: uses Express middleware on the admin server
  RED.httpAdmin.get('/contribapi/moment', RED.auth.needsPermission('moment.read'), function(req,res) {
    res.json({
      'tz': hostTz,
      'locale': hostLocale
    });
  });
};
