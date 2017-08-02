/**
* models index.js
**/

const { getExports } = require('../utils');

module.exports = (schema, decorate) => {
  return getExports({
    dir: __dirname,
    currentFile: __filename
  }, schema, decorate)
}
