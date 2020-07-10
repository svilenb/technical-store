const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");
const indexRouter = require("../routes/index");
const loginRouter = require("../routes/login");
const logoutRouter = require("../routes/logout");
const engine = require("../utils/engine");
const passport = require('passport');
const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");
const async = require("async");

module.exports = function(app, config) {
  app.set('views', config.rootPath + '/views');
  app.set('view engine', 'js');
  // populate view data
  app.use(function(req, res, next) {
    res.locals.viewData = {};
    next();
  });
  app.engine('js', engine)
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: 'magic unicorns',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/build', express.static(config.rootPath + '/build'));
  app.use(function(req, res, next) {
    if (req.user) {
      res.locals.viewData.currentUser = req.user;
    } else {
      res.locals.viewData.currentUser = undefined;
    }

    next();
  });

  app.use(function(req, res, next) {
    async.parallel([
      function(callback) {
        categoriesData.getAll(function(err, results) {
          if (err) {
            return callback(err);
          }

          res.locals.viewData.categories = results;
          callback();
        });
      },
      function(callback) {
        subcategoriesData.getAll(function(err, results) {
          if (err) {
            return callback(err);
          }

          res.locals.viewData.subcategories = results;
          callback();
        });
      }
    ], function(err) {
      if (err) {
        return next(err);
      }

      next();
    });
  });

  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    const message = err.message;
    const error = req.app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    if (req.xhr) {
      res.status(status).send({ error: message });
    } else {
      // set locals, only providing error in development
      res.locals.viewData.message = message;
      res.locals.viewData.error = error;

      // render the error page
      res.status(status);
      res.render('error');
    }
  });
}
