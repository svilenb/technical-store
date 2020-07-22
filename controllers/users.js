const usersData = require("../data/users");

const CONTROLLER_NAME = "users";

module.exports = {
  getAll: function(req, res, next) {
    usersData.getAll(function(err, users) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_index", {
        users
      });
    });
  },
  getMe: function(req, res, next) {
    usersData.getById(req.user._id, function(err, user) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_view", {
        user
      });
    });
  },
  getUser: function(req, res, next) {
    usersData.getById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      }

      usersData.areFriends(req.user.id, req.params.id, function(err, areFriends) {
        res.render(CONTROLLER_NAME + "_view", {
          user,
          areFriends
        });
      });
    });
  },
  friend: function(req, res, next) {
    usersData.friend(req.params.id, req.user._id, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send("Success");
    });
  },
  unfriend: function(req, res, next) {
    usersData.unfriend(req.params.id, req.user._id, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send("Success");
    });
  },
};
