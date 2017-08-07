const selenium = require("selenium-webdriver");

const phantomjs_exe = require('phantomjs-prebuilt').path;
const phantomJS = selenium.Capabilities.phantomjs();
phantomJS.set("phantomjs.binary.path", phantomjs_exe);

// chrome driver for development purposes
require('chromedriver');
const chrome = selenium.Capabilities.chrome();
//setup custom phantomJS

module.exports = {

    tokenSecret: 'ilovemesecreet',
    database: 'mongodb://localhost:27017',
    browsersConfig: {
      chrome,
      phantomJS,
    },
    selenium

};
