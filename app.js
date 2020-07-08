import express from "express";
import config from "./config/config";
import expressConfig from "./config/express";
import mongooseConfig from "./config/mongoose";

const env = process.env.NODE_ENV || 'development';

const configObject = config[env];

const app = express();

expressConfig(app, configObject);
mongooseConfig(configObject);

module.exports = app;
