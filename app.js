const express = require("express");
const config = require("./config/config");
const expressConfig = require("./config/express");
const mongooseConfig = require("./config/mongoose");
const neo4jConfig = require("./config/neo4j");
const passportConfig = require("./config/passport");
import data from "./data";

const env = process.env.NODE_ENV || 'development';

const configObject = config[env];

const app = express();

expressConfig(app, configObject);
passportConfig();

neo4jConfig.init(configObject);
mongooseConfig.init(configObject);

data.seedInitial(function(err) {
  if(err) {
    return console.error(err);
  }

  console.log("DB seeded successfully");
});

module.exports = app;
