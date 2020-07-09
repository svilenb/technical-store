const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");
const indexRouter = require("../routes/index");
const engine = require("../utils/engine");
const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");
const async = require("async");

module.exports = function(app, config) {
  app.set('views', config.rootPath + '/views');
  app.set('view engine', 'js');

  app.engine('js', engine)

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/build', express.static(config.rootPath + '/build'));

  // populate view data
  app.use(function(req, res, next) {
    res.locals.viewData = {};
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

  app.use('/', indexRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
