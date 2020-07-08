import mongoose from "mongoose";
const category = require("../models/category");
const subcategory = require("../models/subcategory");

module.exports = function(config) {
  mongoose.connect(config.db, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log('Database running...')
  });

  category.seedInitial(function(err, categories) {
    if (err) {
      return callback(err);
    }

    if (categories) {
      subcategory.seedInitial(categories, function(err) {
        if (err) {
          return callback(err);
        }
      });
    }
  });
};
