const fs = require('fs');
const setTimeoutPromise = require('util.promisify')(setTimeout);
const selenium = require("selenium-webdriver");
const By = selenium.By;
const until = selenium.until;
const TIMEOUT = 15000;

module.exports = async ({ driver, step }) => {
  const { options, order, type, target } = step;
  console.log(`carrying out step ${order}`)

  try {
    switch (type) {
      // Operations
      case 'click':
        return locate({ target, driver }).click();

      case 'get':
        return driver.get(validateUrl(options.url));

      case 'sendKeys':
        return locate({ target, driver }).sendKeys(escapeValue(options.value));

      // Assertions
      case 'elementTextContains':
        return await driver.wait(
          until.elementTextContains(
            locate({ target, driver }), escapeValue(options.value)
          ),
          TIMEOUT
        )
        .then(el => {
          console.log(`Expectation of >${options.value}< is true`);
        });

        case 'elementTextNotContains':
          return await driver.wait(
            until.elementTextContains(
              locate({ target, driver }), escapeValue(options.value)
            ),
            5000//striking a balance
          )
          .then(el => {
            return console.log(`Expectation of not >${options.value}< is false`);
          })
          .catch(err => {
            if (err.name === "TimeoutError") return console.log(`Expectation of not >${options.value}< is true`);
          });

      // Default should throw
      default:
        throw new Error(`Do not know how to perform ${type}`)
    }

  }
  catch(err) {
    console.log("got error in writeTest =>", err)
    throw err
  }
  finally {
    // taking snapshot of step
    await driver.takeScreenshot()
    .then(file => {
      return saveScreenshot({ file, saveAs: `screen_shots/step_${order}.png` });
    })
  }
}

function escapeValue(value) {
  // TODO
  return value
}

function locate({ target: { type, value}, driver}) {
  switch (type) {
    case 'css':
      return driver.wait(until.elementLocated(By.css(value)), TIMEOUT)

    default:
      throw new Error(`Could not locate ${value}`)

  }
}

function saveScreenshot({ file, saveAs = `screen_shots/screenShot.png` }) {
  console.log(`saving screenshot as ${saveAs}`)
  return new Promise((resolve, reject) => {

    fs.writeFile(saveAs, file, 'base64', (err) => {
      if (err) reject(err);
      console.log(`saved successfully`);
      resolve(saveAs)
    })
  })
}

function validateUrl(url) {
  // TODO
  return url;
}
