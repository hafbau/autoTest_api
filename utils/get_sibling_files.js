const fs = require('fs');
const path = require('path');

module.exports = ({ dir, currentFile = 'index.js' }) => {
  if (!currentFile.includes('index.js')) throw new TypeError("currentFile is not index.js");
  currentFile = 'index.js'

  return fs.readdirSync(dir)
    .filter(file => file !== currentFile)
    .map(file => file.substring(0, file.length - 3))
}
