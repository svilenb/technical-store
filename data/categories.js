const Category = require("./models/category");

module.exports = {
  seedInitial: function(callback) {
    Category.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        Category.create([
          { name: "TV and Gaming" },
          { name: "Mobile Devices" },
          { name: "PC peripherials" },
          { name: "IT Accessories" },
          { name: "Home" },
        ], callback);
      } else {
        callback();
      }
    });
  }
}
