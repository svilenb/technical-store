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
  }
};
