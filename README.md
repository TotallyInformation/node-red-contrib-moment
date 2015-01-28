# node-red-contrib-moment
[Node-Red](http://nodered.org) Node that produces a nicely formatted Date/Time string using the Moment.JS library.

Based on thoughts from a [conversation in the Node-Red Google Group](https://groups.google.com/d/msg/node-red/SXEGvfFLfQA/fhJCGBWvYEAJ).

#Install

Run the following command in the root directory of your Node-RED install

	npm install node-red-contrib-moment

While in development, install with:
   
    npm install https://github.com/TotallyInformation/node-red-contrib-moment/tarball/master

#Usage

The node expects an input from the incoming msg. By default, this is msg.payload. If it is a recognisable date/time, it will apply a format and output the resulting string or
object accordingly.

There are 4 possible parameters to the node.

  1) *Topic* - as expected, if provided, msg.topic will be set on the output. Otherwise, any input topic is passed through
  2) *Input* - defines the Property on the input msg that carries the date/time. msg.payload by default.
     Input must be either a Javascript Date object or a date/time string that can be parsed by Modment.JS.
  3) *Format* - defines how the output should be formatted.
     Can be any format string recognised by Moment.JS or one of:
    <dl>
        <dt>fromNow (timeAgo)</dt>
        <dd>e.g. 30 minutes ago</dd>
        <dt>calendar (aroundNow)</dt>
        <dd>e.g. "Last Monday", "Tomorrow 2:30pm"</dd>
        <dt>date (jsDate)</dt>
        <dd>a Javascript Date object</dd>
        <dt>If left blank or set to ISO8601</dt>
        <dd>Output in ISO8601 format</dd>
    </dl>
  4) *Output* - defines the property on the output msg that will carry the formatted date/time string (or Javascript object).
  5) *Name* - as usual, a unique name identifier for the node instance.

#License 

This code is Open Source under an Apache 2 License. Please see the [apache2-license.txt file](https://github.com/TotallyInformation/node-red-contrib-moment/apache2-license.txt) for details.

You may not use this code except in compliance with the License. You may obtain an original copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Please see the
License for the specific language governing permissions and limitations under the License.

# Author

[Julian Knight](https://uk.linkedin.com/in/julianknight2/) ([Totally Information](https://www.totallyinformation.com)), https://github.com/totallyinformation

#Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/TotallyInformation/node-red-contrib-moment/issues).

For more information, feedback, or community support see the Node-Red Google groups forum at https://groups.google.com/forum/#!forum/node-red