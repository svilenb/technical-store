const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  active: Boolean
});

module.exports = mongoose.model("Category", categorySchema);
