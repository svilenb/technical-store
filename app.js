import express from "express";
import config from "./config/config";
import expressConfig from "./config/express";
import mongooseConfig from "./config/mongoose";
import neo4jConfig from "./config/neo4j";
import data from "./data";

const env = process.env.NODE_ENV || 'development';

const configObject = config[env];

const app = express();

expressConfig(app, configObject);

neo4jConfig.init(configObject);
mongooseConfig.init(configObject);

data.seedInitial(function(err) {
  if(err) {
    return console.error(err);
  }

  console.log("DB seeded successfully");
});

module.exports = app;
