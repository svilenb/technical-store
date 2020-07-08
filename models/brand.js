const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Brand = mongoose.model("Brand", brandSchema);

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
        ])
      } else {
        callback();
      }
    });
  }
};
