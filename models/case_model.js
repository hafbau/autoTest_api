/**
 *  Case schema
 *
 *  Define test Case Model
 *  @param {Object} schema
 *  @return {Object}
 **/

module.exports = (schema, decorate) => {
  const Case = schema.define('case', {
    // run related
    lastRun: {type: schema.Date, default: Date.now()},
    lastPassed: {type: schema.Date},
    isPassing: {type: schema.Boolean, default: false},
    
    // identity related
    name: {type: schema.String, limit: 255, index: true},
    suiteId: {type: schema.Number},
    // steps: { type: schema.Json },
    
    // other options goes in meta
    meta: {type: schema.Json},
    
    // timestamps
    createdAt: {type: schema.Date, default: Date.now()},
    updatedAt: {type: schema.Date, default: Date.now()},

  }, {});

  /* Validators */
  Case.validatesPresenceOf('name');
  Case.validatesPresenceOf('suiteId');
  // Case.validatesFormatOf('name', {with: /^\S+$/, message:"is not valid"});


  // hooks
  Case.afterUpdate = function (next) {
    this.updatedAt = Date.now();
    // Pass control to the next
    return next();
  };

  // custom helpers

  return decorate(Case);
};
