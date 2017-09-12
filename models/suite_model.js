/**
 *  Suite schema
 *
 *  Define test Suite Model
 *  @param {Object} schema
 *  @return {Object}
 **/

module.exports = (schema, decorate) => {
  const Suite = schema.define('suite', {
    // run related
    lastRun: {type: schema.Date, default: Date.now()},
    lastPassed: {type: schema.Date},
    isPassing: {type: schema.Boolean, default: false},

    // identity related
    name: {type: schema.String, limit: 255, index: true},
    siteName: {type: schema.String, limit: 150, index: true},
    siteUrl: {type: schema.String, limit: 150, index: true},
    userId: {type: schema.Number},

    // other options goes in meta
    meta: {type: schema.Json},

    // timestamps
    createdAt: {type: schema.Date, default: Date.now()},
    updatedAt: {type: schema.Date, default: Date.now()},

  }, {});

  /* Validators */
  Suite.validatesPresenceOf('name');
  Suite.validatesPresenceOf('userId');
  // Suite.validatesFormatOf('name', {with: /^\S+$/, message:"is not valid"});


  // hooks
  // Suite.beforeCreate = function (next) {
  //   console.log("this befor create suite", this)
  //   // Pass control to the next
  //   return next();
  // };

  Suite.afterUpdate = function (next) {
    this.updatedAt = Date.now();
    // Pass control to the next
    return next();
  };

  // custom helpers

  return decorate(Suite);
};
