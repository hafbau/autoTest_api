const jwt = require('jsonwebtoken');

module.exports = ({ userModel }, render) => {
  const User = userModel;
  return {
    getLogin: async (ctx) => {
      ctx.body = '<h1>Login Page</h1>'
    },

    getLogout: async (ctx) => {
      if (ctx.user) {
        ctx.user.lastActive = Date.now();
        ctx.user.loggedIn = false;
        ctx.user.save();

        ctx.status = 200;
        return ctx.body = {
          success: true,
          loggedIn: false
        }
      }
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Not Found",
        fullMessage: "Not logged in"
      }
    },

    getRegister: async (ctx) => {
      ctx.body = '<h1>Register Page</h1>'
    },

    postLogin: async (ctx) => {
      const { request: { body }, res } = ctx;
      try {
        const {
          id,
          avatarSource,
          createdAt,
          email,
          firstName,
          lastActive,
          lastName,
          loggedIn,
          meta,
          updatedAt
        } = await User.authenticate(body);

        const user = {
          id,
          avatarSource,
          createdAt,
          email,
          firstName,
          lastActive,
          lastName,
          loggedIn,
          meta,
          updatedAt
        }

        const token = jwt.sign({
          userId: user.id,
          lastActive: user.lastActive },
          process.env.SECRET
        );
        ctx.status = 200;
        ctx.body = {
          success: true,
          token,
          user
        };
      }
      catch (err) {
        ctx.status = 403;
        ctx.body = {
          error: err,
          message: 'User authentication failed',
          success: false,
        };
      }
    },

    postRegister: async (ctx) => {
      const { request: { body }, res } = ctx;
      try {
        const {
          id,
          avatarSource,
          createdAt,
          email,
          firstName,
          lastActive,
          lastName,
          loggedIn,
          meta,
          updatedAt
        } = await User.create(body);
        const user = {
          id,
          avatarSource,
          createdAt,
          email,
          firstName,
          lastActive,
          lastName,
          loggedIn,
          meta,
          updatedAt
        }
        
        const token = jwt.sign({
          userId: user.id,
          lastActive: user.lastActive },
          process.env.SECRET
        );
        ctx.status = 200;

        return ctx.body = {
          success: true,
          token,
          user
        };
      }
      catch (err) {
        console.log("got error in post register", err)
        ctx.status = 403;
        return ctx.body = {
          error: err,
          message: 'User registration failed',
          success: false,
        };
      }
    }
  }
}
