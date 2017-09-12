/**
* models index.js
**/

const { getExports } = require('../utils');

module.exports = (schema, decorate) => {
  models = getExports({
    dir: __dirname,
    currentFile: __filename
  }, schema, decorate);

  // Set up Relationships
  models.userModel.hasMany(models.suiteModel,   {as: 'suites',  foreignKey: 'userId'});
  models.suiteModel.hasMany(models.caseModel,   {as: 'cases',  foreignKey: 'suiteId'});
  models.caseModel.hasMany(models.stepModel,   {as: 'steps',  foreignKey: 'caseId'});
  models.caseModel.hasMany(models.resultModel,   {as: 'results',  foreignKey: 'caseId'});
  models.stepModel.hasMany(models.resultModel,   {as: 'results',  foreignKey: 'stepId'});

  return models;
}
