const moment = require('moment-timezone')
const parseFormat = require('moment-parseformat')

console.log(moment().tz("America/Los_Angeles").format('d'))
console.log(moment().tz("Europe/London").format('d'))
