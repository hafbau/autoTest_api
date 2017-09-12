/**
 *  Result schema
 *
 *  Define test Result Model
 *  @param {Object} schema
 *  @return {Object}
 **/

module.exports = (schema, decorate) => {
  const Result = schema.define('result', {
    // run related
    image: { type: schema.String },
    imageDataUrl: { type: schema.String },
    message: { type: schema.String },
    pass: { type: schema.Boolean },

    // identity related
    caseId: { type: schema.Number },
    stepId: { type: schema.Number },
    stepOrder: { type: schema.Number },

    // other options goes in meta
    meta: { type: schema.Json },

    // timestamps
    createdAt: { type: schema.Date, default: Date.now() }

  }, {});

  /* Validators */
  Result.validatesPresenceOf('stepId');
  Result.validatesPresenceOf('pass');
  
  // hooks

  // custom helpers

  return decorate(Result);
};
