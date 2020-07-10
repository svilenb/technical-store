const mongoose = require("mongoose");
const encryption = require("../../utils/encryption");

const userSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  roles: [String],
  salt: { type: String, required: true },
  hashPass: { type: String, required: true }
});

userSchema.methods.authenticate = function(password) {
  if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
    return true;
  } else {
    return false;
  }
}

module.exports = mongoose.model("User", userSchema);
