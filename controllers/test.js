const jwt = require('jsonwebtoken');
const tokenSecret = require('../config').tokenSecret;

module.exports = ({ userModel, suiteModel }, render) => {
  const User = userModel, Suite = suiteModel;
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
