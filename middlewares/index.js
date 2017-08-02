const { getExports } = require('../utils')

module.exports = (models) => {
  const toExport = getExports({
    dir: __dirname,
    currentFile: __filename
  }, models);

  return toExport;
};
