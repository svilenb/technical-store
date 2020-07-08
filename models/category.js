import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  seedInitial: function(callback) {
    Category.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        Category.create([
          { name: "TV and Gaming" },
          { name: "Mobile Devices" },
          { name: "PC peripherials" },
          { name: "IT Accessories" },
          { name: "Photo and Video" },
        ], callback);
      } else {
        callback();
      }
    });
  }
}
