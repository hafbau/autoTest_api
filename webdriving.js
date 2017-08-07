// require('chromedriver');
const selenium = require("selenium-webdriver");
const By = selenium.By;
const until = selenium.until;

//setup custom phantomJS capability
const phantomjs_exe = require('phantomjs-prebuilt').path;
const customPhantom = selenium.Capabilities.phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_exe);
//build custom phantomJS driver
const driver = new selenium.Builder().
       withCapabilities(customPhantom).
       build();

const url = "http://staging.mystrengthbook.com";
// driver.getWindowHandle();
driver.get(url);
driver.wait(until.elementLocated(By.css('img.logo')), 120000)
  .then(_ => {
    return driver.getTitle();
  })
  .then(
    title => console.log("title", title, title.includes("MyStrengthBook"))
  )
  .then(_ => driver.quit());
