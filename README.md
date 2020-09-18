# xxx

## moments node
Features
- Input timezone nur, wenn textuelle Interpretation. Bei timestamp als Zahl nicht notwendig, da timestamp UTC sein sollte
- Input timezone wird von lokaler Timezone übernommen, wenn nichts anderes eingegeben wird ([determined by system])
- Wenn Output format leer ist, kommt UTC im Zulu-Format, egal was in Output TZ bzw. Locale steht
  - Zulu-Format: https://momentjs.com/docs/#/displaying/as-iso-string/  (Beispiel: 2013-02-04T22:44:30.652Z)

- Output Format: Siehe dort: https://momentjs.com/docs/#/displaying/format/
- Timezones (tzdata): Siehe z.B. dort: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
- Timestamp ist in ms seit 01.01.1970: https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/. Dies ist das Format, das ein Inject-Node bei Output **timestamp** ausgibt



##### Blank (ISO8601, ISO)  
ISO 8602 format, e.g. "2015-01-28T16:24:48.123Z"  
Note that ISO8601 formatted output is ALWAYS in UTC ('Z', Zulu time) not local, no matter what output timezone you may specify.  

##### date (jsDate)
A Javascript Date object
This is the default if the input is a recognised date string object  
A Javascript object in the form `{years:nnnn, months:n, date:n, hours:n, minutes:n, seconds:n, milliseconds:n}`

WARNING: moment.js has a bizarre object format where the month is zero-based (0-11) instead of 1-based (1-12) like all the other elements are. I don't currently know why, I've raised an upstream issue but this appears to be a deliberate decision for some strange reason.

##### fromNow (timeAgo)
Human readable output, e.g. 30 minutes ago

##### calendar (aroundNow)
Human readable alternative, e.g. "Last Monday", "Tomorrow 2:30pm"  
Note that dates beyond a week from now are output as yyyy-mm-dd




## humanizer node
- setzt Zeitdauern in Text um: Integer -> String
- macht Textformat (Ausgabesprache) an locale des PCs fest, d.h. en_EN, de_DE,...
  - Ausgabesprache ist nicht einstellbar



- Changelog.md oder .txt einführen
- package.json inkrementieren


## .html
- Input Timezone vs. Output Tz im Text: -> "Output Timezone" ändern
- Hilfetext prüfen/korrigieren/erweitern
  - moments node
  - humanizer node



References: ggfs. siehe unten "depends on"



# node-red-contrib-moment
[Node-RED](http://nodered.org) node ***moment*** produces a nicely formatted Date/Time string using the Moment.JS library. The node is fully time zone/DST/locale aware.  
Node ***humanizer*** converts time durations (differences) into textual descriptions (e.g. 2 minutes).   
Both nodes are locale aware regarding the language of the output strings.

![node-appearance](images/node-appearance.png "Node appearance")  
**Fig. 1:** Node appearance


[![Platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![NPM Version](https://img.shields.io/npm/v/node-red-contrib-moment.svg?logo=npm)](https://www.npmjs.com/package/node-red-contrib-moment)
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


Based on thoughts from a [conversation in the Node-RED Google Group](https://groups.google.com/d/msg/node-red/SXEGvfFLfQA/fhJCGBWvYEAJ). Updated with timezone/locale capabilities after Jaques44's initial work. Updated with +/- adjustments after [another conversion in the Google Group](https://groups.google.com/forum/#!topic/node-red/u3qoISFoKus).


**IMPORTANT NOTE FOR v3+**:
- Because this node uses the `moment` library and because of an upstream security issue requiring updates to underlying libraries, this version of the node is **dependent on Node.JS v6 or above**. Therefore it will not work with Node v4
- If you are forced to use Node v4, please stay with v2x of this node
- Otherwise, please consider upgrading to the current LTS version of Node.JS


References:
- [Moment.js](https://momentjs.com/docs/) library
- [Zulu](https://momentjs.com/docs/#/displaying/as-iso-string/) time format
- [Timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones/) (tzdata)


<a name="installation"></a>
# Installation

<a name="installation_in_node-red"></a>
## In Node-RED (preferred)
* Via Manage Palette -> Search for "node-red-contrib-moment"

<a name="installation_in_a_shell"></a>
## In a shell
Basic installation:
* go to the Node-RED "userDir" folder, typically `~/.node-red`
* run `npm install node-red-contrib-moment`

If you want to install the Node v4 compatible version:
* run `npm install node-red-contrib-moment@2`

To get the latest development version, install with:
* run `npm install https://github.com/TotallyInformation/node-red-contrib-moment/tarball/master`


<a name="moment_usage"></a>
# Usage of node *moment*
The easiest usage of the node is feeding it with an timestamp inject:

![moment-basic-usage](images/moment-basic-usage.png "Node moment usage")  

**Fig. 2:** Basic usage node *moment*

In this example the node converts the timestamp to UTC (Zulu) time and emits it as an output `msg`.

The node generally expects an input from the incoming `msg`. By default, this is `msg.payload`. If it contains a recognisable ***date/time***, it will convert it to the configured output format and will output the resulting string or object.  
Input and output ***time zones*** are settable as is the output ***locale***. All of which default to the host systems tz/locale.

This allows the node to be used to translate from one time zone to another. It also will take into account daylight savings time (DST).

You can also apply an adjustment to the date/time by adding or subtracting an amount.

<a name="moment_node_configuration"></a>
## Configuration of node *moment*

![moment-node-settings](images/moment-node-configuration.png "Node moment properties")  

**Fig. 3:** Properties of node *moment*

# xxx

### 'Input from' and 'Output to'


### 'Input Timezone' and 'Output Timezone'


### 'Adjustment'


### 'Output Format' and 'Locale'


### Additional topic

xxx Zus. Topic ohne Inhalt


## Input of node *moment*

If the **Input from**:

* is "timestamp", the current date/time is used as input. Output will be processed as normal.
* is "msg", "global" or "flow" and the given property is empty or does not exist, the current date/time is used as input. Output will be processed as normal.
* is a property containing a numeric value, it will be assumed to be a UNIX time value (ms since 1970-01-01 I think). Output will be processed as normal.
* is a property containing a string that is not a recognisable date/time (including `null`). Output is an empty string plus a debug warning.

## Outputs of node *moment*

If the **output** property is not `msg.payload` the input `msg.payload` is retained in the output.

See the node's built-in help for more details.


# Usage of node *humanizer*
Specify the input variable to execute humanize on, `msg.payload.humanized` will contain a humanized version of the specified span in seconds. (Contributed by [Laro88](https://github.com/Laro88))


## Configuration of node *humanizer*

![humanizer-node-settings](images/humanizer-node-configuration.png "Node humanizer properties")  
**Fig. xxx:** Properties of node *humanizer*


### 'Input variable'




## Input of node *humanizer*


## Outputs of node *humanizer*



# Examples



# Depends on
- [Moment.js](http://momentjs.com/docs) - Clever date/time handler for Node.js and browsers
- [Moment-Timezone](http://momentjs.com/timezone/docs) - Adds timezone and locale awareness to Moment.js
- [Moment-ParseFormat](https://github.com/gr2m/moment-parseformat) - Tries to interpret input strings as date/times and creates a format string that moment.js can use.
- [os-locale](https://github.com/sindresorhus/os-locale) - interpets the host OS's locale. Works with Windows as well as Linux.
- [Node-RED](http://nodered.org/docs/) - of course!

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


# Contributors/Credits

* [Vicary Archangel](https://github.com/vicary)
* [Steve Rickus](https://github.com/shrickus)
* [Jes Ramsing](https://github.com/Laro88)
* [Jacques W](https://github.com/Jacques44)
* [StephanStS](https://github.com/StephanStS)

Many thanks for the contributions.

# Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/TotallyInformation/node-red-contrib-moment/issues).

For more information, feedback, or community support see the Node-RED Google groups forum at https://groups.google.com/forum/#!forum/node-red
