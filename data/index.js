const async = require("async");
const categories = require("../data/categories");
const subcategories = require("../data/subcategories");
const brands = require("../data/brands");
const usersData = require("../data/users");
const productsData = require("../data/products");

module.exports = {
  seedInitial: function(callback) {
    async.parallel({
      categories: function(callback) {
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
            } else {
              callback();
            }
          }
        ], callback);
      },
      brands: function(callback) {
        brands.seedInitial(callback);
      },
      users: function(callback) {
        usersData.seedInitial(function(err, users) {
          if (err) {
            return callback(err);
          }

          if (users) {
            async.series([
              function(callback) {
                usersData.friend(users[1]._id, users[0]._id, callback);
              },
              function(callback) {
                usersData.friend(users[2]._id, users[0]._id, callback);
              },
              function(callback) {
                usersData.friend(users[3]._id, users[0]._id, callback);
              },
              function(callback) {
                usersData.friend(users[4]._id, users[0]._id, callback);
              },
              function(callback) {
                usersData.friend(users[5]._id, users[1]._id, callback);
              }
            ], function(err) {
              if (err) {
                return callback(err);
              }

              callback(null, users);
            });
          } else {
            callback();
          }
        });
      }
    }, function (err, results) {
      if (err) {
        return callback(err);
      }

      if (results && results.categories && results.brands && results.users) {
        productsData.seedInitial({
          ...results.categories,
          brands: results.brands,
        }, function(err, products) {
          if (err) {
            return callback(err);
          }

          async.series([
            function(callback) {
              productsData.buy(products[0]._id, results.users[3]._id, callback);
            },
            function(callback) {
              productsData.buy(products[0]._id, results.users[2]._id, callback);
            },
            function(callback) {
              productsData.buy(products[1]._id, results.users[1]._id, callback);
            },
            function(callback) {
              productsData.buy(products[0]._id, results.users[5]._id, callback);
            }
          ], callback)
        });
      }
    });
  }
};
