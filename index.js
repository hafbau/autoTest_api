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

  // cross-origin set up
  app.use(middlewares.cors);
  
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
        console.log("erro handlin", err)
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message
        };
      }
  });

  // attaching user to context if token checks out
  app.use(middlewares.ensureUser)
  
  // putting models on ctx
  app.use(async (ctx, next) => {
    ctx.models = models;
    await next();
  })
  
  // creates http server from app, and attach the io (realtime) middleware to ctx,
  const { io, server } = require('./io')(app);
  
    // set up app routes
    app.use(combinedRoutes);
  
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
  server.listen(4000, () => console.log("listening on port 4000"));

}) // db connected
