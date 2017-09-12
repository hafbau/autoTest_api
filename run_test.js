const { convertToDataUrl } = require('./utils');
const { browsersConfig: { chrome, phantomJS }, selenium } = require('./config');
const By = selenium.By;
const until = selenium.until;
const { writeTest } = require("./business_logics")();

const driver = new selenium.Builder().
       withCapabilities(phantomJS).
       build();

async function runTestCase({ steps }, ctx) {
  const { models, io } = ctx;
  const Result = models.resultModel;
  let results = [];

  const output = await steps.reduce(async (resolved, step, index) => {
    return await resolved.then(async () => {
      const result = await Result.create(await writeTest({ driver, step }));

      // status of this run of the test case.
      // TODO: revise this logic for failed step but not terminated case run
      const status = result.pass ? index < steps.length - 1 ? "pending" : "done" : "failed"
      // emits single step result
      io.emit(`${ctx.user.id}`, { type: 'STEP_RESULT', payload: { result, status } })

      results.push(result);
      return result;
    })

  }, Promise.resolve())

  .then(_ => {
    console.log("All done!")
  })
  
  .catch (err => {
    console.log("failure!", err)
    driver.quit()
  });
  
  driver.quit()
  console.log("finished finally", results.length, "quitted driver", driver);
  return ctx.body = results;
  // return render(ctx, "screen_shots/_step_1.png")
}

module.exports = runTestCase;

// dev sample run
// const { steps } = require('./db/seed_data');
// runTestCase({ steps })
