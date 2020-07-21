const mongoose = require("mongoose");
const encryption = require("../../utils/encryption");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  photo: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phonuNumber: String,
  roles: { type: [String], default: [] },
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

var minUsernameLength = 3;
var maxUsernameLength = 20;

userSchema.virtual('minUsernameLength').get(function() {
  return minUsernameLength;
});

userSchema.virtual('minUsernameLength').set(function(value) {
  minUsernameLength = value;
});

userSchema.virtual('maxUsernameLength').get(function() {
  return maxUsernameLength;
});

userSchema.virtual('maxUsernameLength').set(function(value) {
  maxUsernameLength = value;
});

userSchema.path('username').validate(function(value) {
  var correctLength = this.minUsernameLength <= value.length && value.length <= this.maxUsernameLength;
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_.';
  var correctCharacters = true;

  for (var i = 0; i < value.length; i += 1) {
    if (characters.indexOf(value[i]) === -1) {
      correctCharacters = false;
    }
  }

  return correctLength && correctCharacters;
});

module.exports = mongoose.model("User", userSchema);
