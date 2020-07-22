const express = require("express");
const session = require("express-session");
const redis = require("redis")
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");
const busboy = require('connect-busboy');
const homeRouter = require("../routes/home");
const loginRouter = require("../routes/login");
const logoutRouter = require("../routes/logout");
const signupRouter = require("../routes/signup");
const categoriesRouter = require("../routes/categories");
const adminRouter = require("../routes/admin");
const productsRouter = require("../routes/products");
const usersRouter = require("../routes/users");
const engine = require("../utils/engine");
const passport = require('passport');
const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");
const async = require("async");

let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient()

module.exports = function(app, config) {
  app.set("views", config.rootPath + "/views");
  app.set("view engine", "js");
  app.engine("js", engine);
  app.use(logger("dev"));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(busboy({
    immediate: false
  }));
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: "magic unicorns",
    resave: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/build", express.static(config.rootPath + "/build"));
  app.use(function(req, res, next) {
    if (req.user) {
      res.locals.currentUser = req.user;
    } else {
      res.locals.currentUser = undefined;
    }

    next();
  });

  app.use("/", homeRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);
  app.use("/signup", signupRouter);
  app.use("/category", categoriesRouter);
  app.use("/admin", adminRouter);
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    const message = err.message;
    const error = req.app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    if (req.xhr) {
      res.status(status).send({ error: message });
    } else {
      // set locals, only providing error in development
      res.locals.message = message;
      res.locals.error = error;

      // render the error page
      res.status(status);
      res.render("error");
    }
  });
}
