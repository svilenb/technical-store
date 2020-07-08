const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    roles: [String]
})

module.exports = mongoose.model("User", userSchema);
