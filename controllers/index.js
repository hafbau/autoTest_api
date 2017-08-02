/**
* controllers index.js
**/

const { getExports } = require('../utils');

module.exports = (models, render) => {
  return getExports({
    dir: __dirname,
    currentFile: __filename
  }, models, render)
}
