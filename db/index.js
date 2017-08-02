/**
* db index.js
**/

const caminte = require('caminte'),
      Schema  = caminte.Schema,
      config  = {
        driver     : "mongo",
        host       : "localhost", // TODO: make this dynamic based on enviroment
        port       : "27017",
        // username   : process.env.DB_USER,
        // password   : process.env.DB_PASSWORD,
        database   : process.env.DB_NAME,
      };

module.exports = new Schema(config.driver, config);
