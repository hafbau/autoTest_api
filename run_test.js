const { browsersConfig: { chrome, phantomJS }, selenium } = require('./config');
const By = selenium.By;
const until = selenium.until;
const { writeTest } = require("./business_logics")();

const driver = new selenium.Builder().
       withCapabilities(phantomJS).
       build();

function runTestCase({ steps }) {
  return steps.reduce(async (resolved, step) => {
    return await resolved.then(_ => {
      return writeTest({ driver, step })
    })

  }, Promise.resolve())

  .then(_ => {
    console.log("All done!")
    driver.quit()
  })

  .catch (err => {
    console.log("failure!", err)
    driver.quit()
  });
}

module.exports = runTestCase;

// dev sample run
// const { steps } = require('./db/seed_data');
// runTestCase({ steps })
