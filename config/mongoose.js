const mongoose = require("mongoose");

module.exports = {
  init: function(config) {
    mongoose.connect(config.mongodb, { useNewUrlParser: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
      console.log('Mongo Database running...')
    });
  }
};
