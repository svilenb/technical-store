import mongoose from "mongoose";
import category from "../models/category";

module.exports = function(config) {
  mongoose.connect(config.db);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Database running...')
  });

  category.seedInitial(function(err) {
    if (err) {
      return callback(err);
    }

    console.log("Categories added to the database.");
  });

};
