const Brand = require("./models/brand");

module.exports = {
  seedInitial: function(callback) {
    Brand.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        Brand.create([
          { name: "LG" },
          { name: "PANASONIC" },
          { name: "PHILIPS" },
          { name: "SAMSUNG" },
          { name: "TOSHIBA" },
          { name: "SONY" },
          { name: "BOSCH" },
        ], callback);
      } else {
        callback();
      }
    });
  }
};
