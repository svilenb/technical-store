const mongoose = require("mongoose");
const async = require("async");
const categories = require("../data/categories");
const subcategories = require("../data/subcategories");
const brands = require("../data/brands");
const users = require("../data/users");

module.exports = function(config) {
  mongoose.connect(config.db, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log('Database running...')
  });

  async.parallel([
    function(callback) {
      categories.seedInitial(function(err, categories) {
        if (err) {
          return callback(err);
        }

        if (categories) {
          subcategories.seedInitial(categories, function(err, subcategories) {
            if (err) {
              return callback(err);
            }

            callback(null, { categories, subcategories })
          });
        }
      })
    },
    function(callback) {
      brands.seedInitial(callback);
    },
    function(callback) {
      users.seedInitial(callback);
    }
  ], function(err, results) {
    if (err) {
      console.log(err);
    }

    console.log("successfully seeded db");
  });
};
