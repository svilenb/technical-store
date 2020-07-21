const passport = require('passport');

module.exports = {
  login: passport.authenticate('local', { successRedirect: '/' }),
  logout: function(req, res, next) {
    req.logout();
    res.status(200).send("Successfully logged out");
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    } else {
      next();
    }
  },
  isGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      next();
    }
  },
  isInRole: function(role) {
    return function(req, res, next) {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next();
      } else {
        res.status(403).send("Forbidden");
      }
    }
  },
};
