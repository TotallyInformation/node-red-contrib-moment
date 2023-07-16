// const locale = (process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES).split('.')[0]

// console.log(locale, process.env.LANG, process.env.LANGUAGE, process.env.LC_ALL, process.env.LC_MESSAGES)

// const { osLocale } = require("os-locale-s");
const osLocale = require("os-locale");
// (async () => {
//     console.log(await osLocale());
//     //=> 'en-US'
// })();
console.log(osLocale.sync())
