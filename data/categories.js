const Category = require("./models/category");

module.exports = {
  getAll: function(callback) {
    Category.find().select("_id name").exec(callback);
  },
  getByName: function(name, callback) {
    Category.findOne({ name }).select("_id name").exec(callback);
  },
  seedInitial: function(callback) {
    Category.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        Category.create([
          { name: "TV and Gaming" },
          { name: "Mobile Devices" },
          { name: "PC peripherials" },
          { name: "IT Accessories" },
          { name: "Home appliances" },
        ], callback);
      } else {
        callback(null, collection);
      }
    });
  },
}
