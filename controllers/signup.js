const fs = require('fs');
const encryption = require("../utils/encryption");
const usersData = require("../data/users");
const conig = require("../config/config");

const CONTROLLER_NAME = "signup";

module.exports = {
  getSignup: function(req, res, next) {
    res.render(CONTROLLER_NAME + "_index");
  },
  postSignup: function(req, res, next) {
    const newUserData = {};

    req.pipe(req.busboy);

    req.busboy.on('file', function(fieldname, file, filename) {
      if (!fs.existsSync(config[env].rootPath + "public/img/users/" + newUserData.username)) {
        fs.mkdirSync(config[env].rootPath + "public/img/users/" + newUserData.username);
      }

      const filePath = config[env].rootPath + "public/img/users/" + newUserData.username + "/" + filename;
      const fstream = fs.createWriteStream(filePath);
      file.pipe(fstream);
      newUserData.photo = "/img/users/" + newUserData.username + "/" + filename;
    });

    req.busboy.on('field', function(fieldname, val) {
      if (fieldname !== "photo") {
        newUserData[fieldname] = val;
      }
    });

    req.busboy.on('finish', function() {
      if (newUserData.password != newUserData.passwordConfirm) {
        res.status(400).send({ error: "Passwords do not match!" });
      } else {
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        usersData.create(newUserData, function(err, user) {
          if (err) {
            return next(err);
          }

          req.logIn(user, function(err) {
            if (err) {
              if (err) {
                return next(err);
              }
            } else {
              res.redirect('/');
            }
          });
        });
      }
    });
  }
};
