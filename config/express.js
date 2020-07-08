import express from "express";
import engine from "../utils/engine";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";
import indexRouter from "../routes/index";

module.exports = function(app, config) {
  app.set('views', config.rootPath + '/views');
  app.set('view engine', 'js');

  app.engine('js', engine)

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/build', express.static(config.rootPath + '/build'));

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
