const jwt = require('jsonwebtoken');
const tokenSecret = require('../config').tokenSecret;

module.exports = ({ userModel }, render) => {
  const User = userModel;
  return {
    getRoot: async (ctx, next) => {
      const { req, res, user } = ctx;
      if (user) {
        ctx.body = {
          user,
          loggedIn: true
        }
      } else {
        ctx.body = {
          loggedIn: false
        }
      }

      ctx.status = 200;
      return next();
    },

  }
}
