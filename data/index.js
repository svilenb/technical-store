const async = require("async");
const categories = require("../data/categories");
const subcategories = require("../data/subcategories");
const brands = require("../data/brands");
const users = require("../data/users");
const products = require("../data/products");

module.exports = {
  seedInitial: function(callback) {
    async.parallel([
      function(callback) {
        async.waterfall([
          function(callback) {
            categories.seedInitial(callback);
          },
          function(categories, callback) {
            if (categories) {
              subcategories.seedInitial(categories, function(err, subcategories) {
                if (err) {
                  return callback(err);
                }

                callback(null, { categories, subcategories })
              });
            }
          }
        ], callback);
      },
      function(callback) {
        brands.seedInitial(callback);
      },
      function(callback) {
        users.seedInitial(callback);
      }
    ], function (err, results) {
      if (err) {
        return callback(err);
      }

      products.seedInitial({
        ...results[0],
        brands: results[1],
      }, callback);
    });
  }
};
