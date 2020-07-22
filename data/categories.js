const _ = require('lodash');
const Category = require("./models/category");
const neo4jConfig = require("../config/neo4j");

const CATEGORIES_PROJECTION = "_id name active"

const create = function(data, callback) {
  Category.create(data, function(err, results) {
    if (err) {
      return callback(err);
    }

    const session = neo4jConfig.getDriver().session();

    const cypherResults = (_.isArray(results) ? results : [results]);

    const cypherQuery = `CREATE ${cypherResults.map(function(result, index) { return `(:Category {id: $idParam${index}, name: $nameParam${index}})` }).join(",")}`;

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
  getById: function(id, callback) {
    Category.findOne({ _id: id }).select(CATEGORIES_PROJECTION).exec(callback);
  },
  getAll: function(callback) {
    Category.find().select(CATEGORIES_PROJECTION).exec(callback);
  },
  getByName: function(name, callback) {
    Category.findOne({ name }).select(CATEGORIES_PROJECTION).exec(callback);
  },
  create,
  updateById: function(id, data, callback) {
    Category.findByIdAndUpdate(id, data, callback);
  },
  seedInitial: function(callback) {
    Category.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = [
          "TV and Gaming",
          "Mobile Devices",
          "PC peripherials",
          "IT Accessories",
          "Home appliances",
        ];

        create(names.map(function(name) {
          return { name, active: true };
        }), callback);
      } else {
        callback(null, null);
      }
    });
  },
}
