module.exports = (app) => {
  const server = require('http').Server(app.callback());
  const  io = require('socket.io')(server);

  // middleware that emits on all requests
  app.use((ctx, next) => {
    const { request } = ctx;
    io.emit(`${request.method.toLowerCase()} ${request.path.toLowerCase()}`, "routed");
    
    ctx.io = io;
    return next();
  });

  return { io, server }
}
