Please note that this node is unlikely to recieve further enhancements now that moment.js is built into JSONata and so is available from change, function and other nodes.

- 5.0.0 - Update dependencies, replace `os-locale` with `os-locale-s`.

  os-locale library is now ESM only which won't work with Node-RED. It is also bloated. Replaced with the lighter-weight os-locale-s library

  **WARNING** Neither os-locale nor os-locale-s seems to work correctly (at least on Windows 11) - it is returning `en_US` rather than `en_GB` on my UK only W11 system.

  **BREAKING** Minimum node.js version is now 14.14 and the minimum Node-RED version is v3.

  **FIXED** - output format `x` and `X` now accepted since the moment.js library is now updated.

- 4.0.0 - Dependency update, output settings, bug fix
   - **BREAKING CHANGE** Updated dependencies mean that minimum Node.js version is now v10 (previously v8). Minimum Node-RED version is now v1.0 (prevously v0.13)
   - Update dependencies
   - Move change log to separate file from readme.
   - Contributed changes, see [Issue #34](https://github.com/TotallyInformation/node-red-contrib-moment/issues/34):
     - Explanation extended, examples added
     - Testing flows moved from subdir examples\ to subdir testing\
     - .html help extended  
   - Prep for Node-RED v1.
   - Workaround for upstream parseFormat bug, see [Issue #24](https://github.com/TotallyInformation/node-red-contrib-moment/issues/24). If input is an ISO date string with seconds >3dp, the input is trimmed to 3dp seconds.
   - Added `msg.settings` to output msg. Shows the settings/parameters used. Allows for further processing or validation if needed.
   - Added ability to override input and output Timezone settings from an incoming msg object. The appropriate setting must be empty and the properties to use are `msg.inTz` and `msg.outTz`. Resolves [Issue #31](https://github.com/TotallyInformation/node-red-contrib-moment/issues/31).
   - Bug fix, locale now correctly defaults to host locale if not provided.
  
- 3.0.3 - Just a version number bump to fix npm.
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
