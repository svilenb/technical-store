const _ = require('lodash');
const Brand = require("./models/brand");
const neo4jConfig = require("../config/neo4j");

const create = function(data, callback) {
  Brand.create(data, function(err, results) {
    if (err) {
      return callback(err);
    }

    const session = neo4jConfig.getDriver().session();

    const cypherResults = (_.isArray(results) ? results : [results]);

    const cypherQuery = `CREATE ${cypherResults.map(function(result, index) { return `(:Brand {id: $idParam${index}, name: $nameParam${index}})` }).join(",")}`;

    session.run(
      cypherQuery,
      cypherResults.reduce(function(acc, result, index) {
        acc[`idParam${index}`] = result._id.toString();
        acc[`nameParam${index}`] = result.name.toString();

        return acc;
      }, {})
    ).then(function(result) {
      session.close();
      callback(null, results);
    }).catch(function(err) {
      session.close();
      callback(err);
    });
  });
}

module.exports = {
  seedInitial: function(callback) {
    Brand.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        create([
          { name: "LG" },
          { name: "PANASONIC" },
          { name: "PHILIPS" },
          { name: "SAMSUNG" },
          { name: "TOSHIBA" },
          { name: "SONY" },
          { name: "BOSCH" },
        ], callback);
      } else {
        callback(null, collection);
      }
    });
  },
  create
};
