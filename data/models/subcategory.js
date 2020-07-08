const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" }
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
