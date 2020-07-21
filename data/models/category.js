const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model("Category", categorySchema);
