const fs = require('fs');
const { convertToDataUrl } = require('../utils');

const selenium = require("selenium-webdriver");
const By = selenium.By;
const until = selenium.until;
const TIMEOUT = 15000;

module.exports = async ({ driver, step }) => {
  const { caseId, id, options, order, type, target } = step;
  console.log(`carrying out step ${order}`)
  const result = {
    caseId,
    pass: true,
    stepId: id,
    stepOrder: order,
  }

  try {
    switch (type) {
      // Operations
      case 'click':
        await locate({ target, driver }).click();
        break;

      case 'get':
        await driver.get(validateUrl(options.value));
        break;
        
      case 'sendKeys':
        await locate({ target, driver }).sendKeys(escapeValue(options.value));
        break;
        
      // Assertions
      case 'textContains':
        await driver.wait(
          until.elementTextContains(
            locate({ target, driver }), escapeValue(options.value)
          ),
          TIMEOUT
        );
        break;

        case 'textNotContains':
          await driver.wait(
            until.elementTextContains(
              locate({ target, driver }), escapeValue(options.value)
            ),
            5000//striking a balance of wait time
          )
          .then(el => {
            result.pass = false;
            return result.message = `Expectation of not >${options.value}< is false`;
          })
          .catch(err => {
            if (err.name === "TimeoutError") return result.message = `Expectation of not >${options.value}< is true`;
            // some other error is a failure
            result.pass = false;
            return result.message = err.message;
          });
          break;

      // Default should throw
      default:
        throw new Error(`Do not know how to perform ${type}`)
    }

    const file = await driver.takeScreenshot();
    result.image = await saveScreenshot({ file, saveAs: `screen_shots/${id ? id : ""}_step_${order}.png` });
    result.imageDataUrl = convertToDataUrl({ data: file })
    return result;
  }
  catch(err) {
    result.pass = false;
    result.message = err.message
    console.log("got error in writeTest =>", err)
    return result
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
