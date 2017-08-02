/**
* business logic index.js
**/

const { getExports } = require('../utils');

module.exports = () => {
  return getExports({
    dir: __dirname,
    currentFile: __filename
  })
}
