const Koa = require('koa');
const bodyParser = require('koa-body');
const jwt = require('jsonwebtoken');

const router = require('koa-router')();
const render = require('koa-send');
require('dotenv').load();

// =======================
// configuration =========
// =======================
const app = new Koa();
const config = require('./config');
const { modelDecorator } = require('./utils');
const db = require('./db');

db.on('connected', () => {

  const models = require('./models')(db, modelDecorator);
  const middlewares = require('./middlewares')(models);
  const controllers = require('./controllers')(models, render);
  const { combinedRoutes } = require('./routes')({controllers, middlewares, router});

  // =======================
  // END configuration =====
  // =======================


  // =======================
  // setting up app ========
  // =======================

  // set up req.body
  app.use(bodyParser());

  // middleware to log requests to the console.
  app.use(async(ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  //error handling middleware
  app.use(async(ctx, next) => {
      try {
        ctx.type = 'json';
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message
        };
      }
  });

  // attaching user to context if token checks out
  app.use(middlewares.ensureUser)

  // set up app routes
  app.use(combinedRoutes);

  // creates http server from app, and attach the io (realtime) middleware to app,
  const { io, server } = require('./io')(app);

  // =======================
  // END setting up app ====
  // =======================

  // TODO: remove this block post development
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
      console.log('message received', msg);
      io.emit('chat message', msg);
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  // =======================
  // start the server ======
  // =======================
  server.listen(3000, () => console.log("listening on port 3000"));

}) // db connected
