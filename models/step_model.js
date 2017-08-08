/**
 *  Step schema
 *
 *  Define test Step Model
 *  @param {Object} schema
 *  @return {Object}
 **/

module.exports = (schema, decorate) => {
  const Step = schema.define('case', {
    // run related
    lastPassed: {type: schema.Date},
    isPassing: {type: schema.Boolean, default: false},

    // identity related
    name: {type: schema.String, limit: 255, index: true},
    caseId: {type: schema.Number},
    order: {type: schema.Number},

    category: {type: schema.String, limit: 50, index: true},
    options: {type: schema.Json},
    target: {type: schema.Json},
    type: {type: schema.String, limit: 150, index: true},

    // other options goes in meta
    meta: {type: schema.Json},

    // timestamps
    createdAt: {type: schema.Date, default: Date.now()},
    updatedAt: {type: schema.Date, default: Date.now()},

  }, {});

  /* Validators */
  Step.validatesPresenceOf('caseId');
  Step.validatesPresenceOf('name');
  Step.validatesPresenceOf('type');
  
  Step.validatesFormatOf('name', {with: /^\S+$/, message:"is not valid"});


  // hooks
  Step.afterUpdate = function (next) {
    this.updatedAt = Date.now();
    // Pass control to the next
    return next();
  };

  // custom helpers

  return decorate(Step);
};
