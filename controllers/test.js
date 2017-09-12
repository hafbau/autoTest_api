const jwt = require('jsonwebtoken');
const tokenSecret = require('../config').tokenSecret;
const runTest = require('../run_test')

module.exports = ({ userModel, suiteModel, caseModel, stepModel }, render) => {
  const User = userModel, Suite = suiteModel, Case = caseModel, Step = stepModel;
  return {
    // C - REATE
    postSuite: async (ctx, next) => {
      try {
        const { req, res, user } = ctx;
        if (user) {
          const suite = user.suites.build(req.body);
          if (suite.save()) {
            ctx.status = 200;
            return ctx.body = {
              suite
            }
          }
          return ctx.throw(400, suite.errors);
        }
        return ctx.throw(403, 'Not logged in');
      }
      catch (err) {
        ctx.status = ctx.status || 500;
        ctx.throw(err)
      }
    },

    saveAndRun: async (ctx, next) => {
      try {
        const { request: { body }, res, user } = ctx;
        const { caseName, name, siteName, siteUrl, steps } = body;

        if (user) {

          const suite = await Suite.create({ name, siteName, siteUrl, userId: user.id });
          const newCase = await Case.create({ name: caseName, suiteId: suite.id });
          
          const acceptableSteps = await Promise.all(
            steps.map(async (step) => {
              return await Step.create({
                caseId: newCase.id,
                category: 'operation',
                name: `Step ${step.order}`,
                order: step.order,
                target: {
                  type: step["target.type"],
                  value: step["target.value"]
                },
                type: step.type,
                options: {
                  value: step["options.value"]
                }
              })
            })
          )

          return await runTest({ steps: acceptableSteps }, ctx) // should be a middleware
        
        }
      }
      catch (err) {
        console.log("errORR", err)
        ctx.status = ctx.status || 500;
        ctx.throw(err)
      }
    },

    // R - EAD
    getAllSuites: async (ctx, next) => {
      try {
        const { req, res, user } = ctx;
        if (user) {
          ctx.status = 200;
          return ctx.body = {
            user,
            suites: user.suites,
          }
        } else {
          return ctx.throw(403, 'Not logged in')
        }
      }
      catch(err) {
        if (err.message !== 'Not logged in') return ctx.throw(500)
      }

    },

  }
}
