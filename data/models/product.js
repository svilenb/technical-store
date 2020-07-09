const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  photos: [String],
  brand: { type: mongoose.Types.ObjectId, required: true, ref: "Brand" },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
  subcategory: { type: mongoose.Types.ObjectId, required: true, ref: "Subcategory" },
});

module.exports = mongoose.model("Product", productSchema);
