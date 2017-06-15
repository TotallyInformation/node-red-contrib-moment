# node-red-contrib-moment
[Node-Red](http://nodered.org) Node that produces a nicely formatted Date/Time string using the Moment.JS library & is fully time zone/DST/locale aware.

Based on thoughts from a [conversation in the Node-Red Google Group](https://groups.google.com/d/msg/node-red/SXEGvfFLfQA/fhJCGBWvYEAJ). Updated with timezone/locale capabilities after Jaques44's initial work. Updated with +/- adjustments after [another conversion in the Google Group](https://groups.google.com/forum/#!topic/node-red/u3qoISFoKus).

# Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-moment

If you want to install the original version:

    npm install node-red-contrib-moment@1

While in development, install with:

    npm install https://github.com/TotallyInformation/node-red-contrib-moment/tarball/master

# Updates
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
The node generally expects an input from the incoming msg. By default, this is msg.payload. If it is a recognisable date/time, it will apply a format and output the resulting string or
object accordingly.

Input and output time zones are settable as is the output locale. All of which default to the host systems tz/locale.

This allows the node to be used to translate from one time zone to another. It also will take into account daylight savings time (DST).

You can also apply an adjustment to the date/time by adding or subtracting an amount.

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

# Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/TotallyInformation/node-red-contrib-moment/issues).

For more information, feedback, or community support see the Node-Red Google groups forum at https://groups.google.com/forum/#!forum/node-red
