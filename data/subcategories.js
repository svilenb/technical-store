const _ = require('lodash');
const Subcategory = require("./models/subcategory");
const neo4jConfig = require("../config/neo4j");

const SUBCATEGORIES_PROJECTION = "_id name category active";

const create = function(data, callback) {
  Subcategory.create(data, function(err, results) {
    if (err) {
      return callback(err);
    }

    const session = neo4jConfig.getDriver().session();

    const cypherResults = (_.isArray(results) ? results : [results]);

    const cypherQuery = `CREATE ${cypherResults.map(function(result, index) { return `(:Subcategory {id: $idParam${index}, name: $nameParam${index}})` }).join(",")}`;

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
  getAll: function(callback) {
    Subcategory.find().select(SUBCATEGORIES_PROJECTION).exec(callback);
  },
  getByName: function(name, callback) {
    Subcategory.findOne({ name }).select(SUBCATEGORIES_PROJECTION).exec(callback);
  },
  seedInitial: function(categories, callback) {
    Subcategory.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const baseSubcategories = [
          { name: "TV", category: categories[0]._id },
          { name: "Soundbars", category: categories[0]._id },
          { name: "Home Theaters", category: categories[0]._id },
          { name: "TV accessories", category: categories[0]._id },
          { name: "Audio systems", category: categories[0]._id },
          { name: "Game consoles", category: categories[0]._id },
          { name: "Games", category: categories[0]._id },

          { name: "Mobile phones", category: categories[1]._id },
          { name: "Tablets", category: categories[1]._id },
          { name: "Smart watches", category: categories[1]._id },
          { name: "Headphones", category: categories[1]._id },

          { name: "Laptops", category: categories[2]._id },
          { name: "Desktops", category: categories[2]._id },
          { name: "Monitors", category: categories[2]._id },
          { name: "Printers And Scaners", category: categories[2]._id },
          { name: "PC Software", category: categories[2]._id },

          { name: "Mice And Keyboards", category: categories[3]._id },
          { name: "Web Cams", category: categories[3]._id },
          { name: "Laptop bags", category: categories[3]._id },
          { name: "CD and DVD discs", category: categories[3]._id },
          { name: "Coolers", category: categories[3]._id },
          { name: "Headphones And Microphones", category: categories[3]._id },
          { name: "PC Speakers", category: categories[3]._id },

          { name: "Vacuum Cleaners", category: categories[4]._id },
          { name: "Washing machines", category: categories[4]._id },
          { name: "Freezers", category: categories[4]._id },
          { name: "Refrigerators", category: categories[4]._id },
          { name: "Cookers", category: categories[4]._id },
        ];

        create(baseSubcategories.map(function(subcategory) {
          return {
            ...subcategory,
            active: true
          };
        }), callback);
      } else {
        callback(null, collection);
      }
    });
  },
  create
};
