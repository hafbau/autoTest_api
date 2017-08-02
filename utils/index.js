const getSiblingFiles = require('./get_sibling_files');
const { fromSnakeToCamel } = require('./string_helpers');

module.exports = getExports({ dir: __dirname, currentFile: __filename });
module.exports.getExports = getExports;

function getExports({ dir, currentFile }, ...args) {
  try {
    const hasArgs = Boolean(args.length);
    const files = getSiblingFiles({ dir, currentFile })
    return files.reduce((exportObject, file) => {

      if (hasArgs) exportObject[fromSnakeToCamel(file)] = require(`${dir}/${file}`)(...args);
      if (!hasArgs) exportObject[fromSnakeToCamel(file)] = require(`${dir}/${file}`);
      return exportObject;

    }, {});
  }
  catch (err) {
    console.log("error in getExports =>", err);
    throw err;
  }

};


// (async function getExports({ dir, currentFile }) {
//   try {
//     const files = await getSiblingFiles({ dir, currentFile }).catch(console.log);
//     console.log('FILES', files)
//     module.exports = files.reduce((exportObject, file) => {
//       console.log('EXPORTOBJECT', exportObject)
//
//       exportObject[fromSnakeToCamel(file)] = require(`./${file}`);
//       return exportObject;
//
//     }, { getExports });
//   }
//   catch (err) {
//     console.log("error in getExports =>", err.message);
//     throw err;
//   }
//
// })({ dir: __dirname, currentFile: __filename });
