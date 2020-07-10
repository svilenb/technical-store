const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersData = require("../data/users");

module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    usersData.getAuthByUsername(username, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    usersData.getById(id, function(err, user) {
      done(err, user);
    });
  });
};
