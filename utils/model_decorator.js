const promisify = require('util.promisify');

module.exports = (model) => {
  try {
    model.cache = {}; // setup cache on models
    // promisifying model functions of the ORM => camenites
    model.all               = promisify(model.all);
    model.create            = promisify(model.create);
    model.count             = promisify(model.count);
    model.prototype.destroy = promisify(model.prototype.destroy);
    model.destroyAll        = promisify(model.destroyAll);
    model.destroyById       = promisify(model.destroyById);
    model.find              = promisify(model.find);
    model.findById          = promisify(model.findById);
    model.findOne           = promisify(model.findOne);
    model.findOrCreate      = promisify(model.findOrCreate);
    model.remove            = promisify(model.remove);
    model.run               = promisify(model.run);
    model.update            = promisify(model.update);
    model.updateOrCreate    = promisify(model.updateOrCreate);
    model.upsert            = promisify(model.upsert);

  }
  catch (err) {
    console.log("model decoration error", err.message);
  }

  return model
}
