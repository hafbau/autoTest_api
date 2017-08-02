const { getExports } = require('../utils')

module.exports = (options) => {
  const toExport = getExports({
    dir: __dirname,
    currentFile: __filename
  }, options);

  toExport.combinedRoutes = options.router.routes();
  return toExport;
};
