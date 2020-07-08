const mongoose = require("mongoose");
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const brand = require("../models/brand");
const async = require("async");

module.exports = function(config) {
  mongoose.connect(config.db, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log('Database running...')
  });

  async.parallel([
    function(callback) {
      category.seedInitial(function(err, categories) {
        if (err) {
          return callback(err);
        }

        if (categories) {
          subcategory.seedInitial(categories, function(err, subcategories) {
            if (err) {
              return callback(err);
            }

            callback({ categories, subcategories })
          });
        }
      })
    },
    function(callback) {
      brand.seedInitial(callback);
    }
  ], function(err, results) {
    if (err) {
      console.log(err);
    }
  });
};
