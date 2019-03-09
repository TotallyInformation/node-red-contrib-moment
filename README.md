# node-red-contrib-moment
[Node-Red](http://nodered.org) Node that produces a nicely formatted Date/Time string using the Moment.JS library & is fully time zone/DST/locale aware.

[![NPM Version](https://img.shields.io/npm/v/node-red-contrib-moment.svg)](https://www.npmjs.com/package/node-red-contrib-moment)
[![NPM Total Downloads](https://img.shields.io/npm/dt/node-red-contrib-moment.svg)](https://www.npmjs.com/package/node-red-contrib-moment)
[![NPM Downloads per month](https://img.shields.io/npm/dm/node-red-contrib-moment.svg)](https://www.npmjs.com/package/node-red-contrib-moment)
[![GitHub last commit](https://img.shields.io/github/last-commit/totallyinformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment)
[![GitHub stars](https://img.shields.io/github/stars/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment/watchers)
[![GitHub watchers](https://img.shields.io/github/watchers/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment/stargazers)
[![GitHub license](https://img.shields.io/github/license/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment/blob/master/LICENSE)
[![Min Node Version](https://img.shields.io/node/v/node-red-contrib-moment.svg)](https://www.npmjs.com/package/node-red-contrib-moment)
[![Package Quality](http://npm.packagequality.com/shield/node-red-contrib-moment.png)](http://packagequality.com/#?package=node-red-contrib-moment)
[![Dependencies](https://img.shields.io/david/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment)
[![Open Issues](https://img.shields.io/github/issues-raw/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment/issues)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/TotallyInformation/node-red-contrib-moment.svg)](https://github.com/TotallyInformation/node-red-contrib-moment/issues?q=is%3Aissue+is%3Aclosed)

Based on thoughts from a [conversation in the Node-Red Google Group](https://groups.google.com/d/msg/node-red/SXEGvfFLfQA/fhJCGBWvYEAJ). Updated with timezone/locale capabilities after Jaques44's initial work. Updated with +/- adjustments after [another conversion in the Google Group](https://groups.google.com/forum/#!topic/node-red/u3qoISFoKus).

**IMPORTANT NOTE FOR v3+**: Because this node uses the `moment` library and because of an upstream security issue requiring updates to underlying libraries, this version of the node is **dependent on Node.JS v6 or above**. It will not work with Node v4. If you are forced to use Node v4, please stay with v2x of this node. Otherwise, please consider upgrading to the current LTS version of Node.JS. Thanks.

# Install

You can always install the latest version via Node-RED's built-in "Manage Palette" menu. Alternatively ...

Run the following command in the "userDir" folder. (typically `~/.node-red`)

    npm install node-red-contrib-moment

If you want to install the Node v4 compatible version:

    npm install node-red-contrib-moment@2

To get the latest development version, install with:

    npm install https://github.com/TotallyInformation/node-red-contrib-moment/tarball/master

# Updates
- 3.0.2 - Update dependencies to latest versions.
- 3.0.1 - **Bug Fix** Remove errant log statement.
- 3.0.0 - No feature changes, just upgrades of the dependent libraries. Note breaking change, minimum Node.JS version is now v6 or above.
    - Documentation updated to clarify processing of different inputs.
    - Fix: If input property contains `null`, output is now a warning + empty string in line with other invalid inputs. It was an incorrect timestamp.
    - Examples added to Node-RED library to make testing easier.
- 2.0.7 - Fallback to new Date(inp) when the date string is non-standard, like this output from the file stat() function: `2017-12-12 16:03:51.832427000 -0400` as well as the Twitter API default time string: `Mon Jan 08 21:24:37 +0000 2018` (contributed by [Steve Rickus](https://github.com/shrickus)). Update dependencies.
- 2.0.6 - Upstream change in MomentJS introduced bug when feeding with a timestamp (number), fixed
- 2.0.5 - Autocorrect common tz errors (e.g. UTC+4 should be ETC/GMT+4) & autofill default
- 2.0.4 - Show warning for invalid timezone specifications
- 2.0.3 - Humanize helper node added, exposes moments humanize of timespan functionality (contributed by [Laro88](https://github.com/Laro88)),
  Documentation updated to highlight issue with moment.js object handing (month is 0-11 not 1-12)
- 2.0.2 - Minor fixes - change version to get latest moment.js. 2017-03-19
- 2.0.1 - Fix get/set of msg properties. 2016-07-08
- 2.0.0 - Significant rewrite, updated moment.js, got rid of all eval's, added adjustment calcs, added time zone and locale awareness. 2016-06-26
- 1.0.9 - Merged in some fixes on Jacques44's contributions & acknowledged him in the package. Also fixed the npm readme. 2016-06-12
- 1.0.5 - Merged a pull request containing a Locale option for localisation. 2016-03-30
- 1.0.3 - First stable release. 2015-01-31

# Usage

## Moment
The node generally expects an input from the incoming msg. By default, this is msg.payload. If it is a recognisable date/time, it will apply a format and output the resulting string or object accordingly.

Input and output time zones are settable as is the output locale. All of which default to the host systems tz/locale.

This allows the node to be used to translate from one time zone to another. It also will take into account daylight savings time (DST).

You can also apply an adjustment to the date/time by adding or subtracting an amount.

If the **Input from**:

* is "timestamp", the current date/time is used as input. Output will be processed as normal.
* is "msg", "global" or "flow" and the given property is empty or does not exist, the current date/time is used as input. Output will be processed as normal.
* is a property containing a numeric value, it will be assumed to be a UNIX time value (ms since 1970-01-01 I think). Output will be processed as normal.
* is a property containing a string that is not a recognisable date/time (including `null`). Output is an empty string plus a debug warning.

If the **output** property is not `msg.payload` the input `msg.payload` is retained in the output.

See the node's built-in help for more details.

## Humanize
Specify the input variable to execute humanize on, `msg.payload.humanized` will contain a humanized version of the specified span in seconds. (Contributed by [Laro88](https://github.com/Laro88))

# Depends on
- [Moment.js](http://momentjs.com/docs) - Clever date/time handler for Node.js and browsers
- [Moment-Timezone](http://momentjs.com/timezone/docs) - Adds timezone and locale awareness to Moment.js
- [Moment-ParseFormat](https://github.com/gr2m/moment-parseformat) - Tries to interpret input strings as date/times and creates a format string that moment.js can use.
- [os-locale](https://github.com/sindresorhus/os-locale) - interpets the host OS's locale. Works with Windows as well as Linux.
- [Node-Red](http://nodered.org/docs/) - of course!

# To Do

Summary of things I'd like to do with the moment node (not necessarily immediately):

* [ ] Add some additional nodes for doing date/time calculations - partly complete, can do simple add/subtract from main node
* [ ] Add additional node for doing duration calculations
* [ ] Add a combo box to the Format field with common formats pre-populated
* [x] Improve the error messages when Moment.JS fails to interpret the input (say why)
* [x] Allow more input date/time formats - turns out Moment.JS doesn't really help here. At present, I see too many input failures from US/UK date formats, etc.
  It would be great if I could parse "human" inputs like "tomorrow" and "2 minutes from now". We can output them now but not input them. As of v1.0.5, a localisation parameter is supported.

  ~~Partly complete: Added the [parseFormat plugin](https://github.com/gr2m/moment.parseFormat). That failed, see code for details.~~ Now complete.

# License

This code is Open Source under an Apache 2 License. Please see the [apache2-license.txt file](https://github.com/TotallyInformation/node-red-contrib-moment/apache2-license.txt) for details.

You may not use this code except in compliance with the License. You may obtain an original copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Please see the
License for the specific language governing permissions and limitations under the License.

# Author

[Julian Knight](https://uk.linkedin.com/in/julianknight2/) ([Totally Information](https://www.totallyinformation.com)), https://github.com/totallyinformation

# Contributors

* [Vicary Archangel](https://github.com/vicary)
* [Steve Rickus](https://github.com/shrickus)
* [Jes Ramsing](https://github.com/Laro88)
* [Jacques W](https://github.com/Jacques44)

Many thanks for the contributions.

# Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/TotallyInformation/node-red-contrib-moment/issues).

For more information, feedback, or community support see the Node-Red Google groups forum at https://groups.google.com/forum/#!forum/node-red
