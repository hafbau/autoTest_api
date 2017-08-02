const jwt = require('jsonwebtoken');

module.exports = ({ userModel }) => {
  const User = userModel;
  return async (ctx, next) => {
    ctx.body = ctx.body || {}
    const token = ctx.body.token || ctx.query.token || ctx.headers['x-access-token'];

    try {
      // jsonwebtoken should throw if can't verify https://github.com/auth0/node-jsonwebtoken
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) throw new Error('user not found');
      const decodedLastActive = new Date(decoded.lastActive);
      if (user.lastActive.getTime() != decodedLastActive.getTime()) throw new Error('stale user');

      ctx.user = user;
      delete ctx.user.password;
      return next();
    }
    catch (err) {
      console.log("got error in verify", err)
      ctx.status = 403;

      ctx.body = {
       success: false,
       message: "Unauthorized",
       fullMessage: err.message
      }
      return next();
    }
  }

}
