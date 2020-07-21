const Category = require("./models/category");

const CATEGORIES_PROJECTION = "_id name active"

module.exports = {
  getById: function(id, callback) {
    Category.findOne({ _id: id }).select(CATEGORIES_PROJECTION).exec(callback);
  },
  getAll: function(callback) {
    Category.find().select(CATEGORIES_PROJECTION).exec(callback);
  },
  getByName: function(name, callback) {
    Category.findOne({ name }).select(CATEGORIES_PROJECTION).exec(callback);
  },
  create: function(data, callback) {
    Category.create(data, callback);
  },
  updateById: function(id, data, callback) {
    Category.findByIdAndUpdate(id, data, callback);
  },
  seedInitial: function(callback) {
    Category.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = [
          "TV and Gaming",
          "Mobile Devices",
          "PC peripherials",
          "IT Accessories",
          "Home appliances",
        ];

        Category.create(names.map(function(name) {
          return { name, active: true };
        }), callback);
      } else {
        callback(null, collection);
      }
    });
  },
}
