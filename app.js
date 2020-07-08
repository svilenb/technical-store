import express from "express";
import config from "./config/config";
import expressConfig from "./config/express";

const env = process.env.NODE_ENV || 'development';

const configObject = config[env];

const app = express();

expressConfig(app, configObject);

module.exports = app;
