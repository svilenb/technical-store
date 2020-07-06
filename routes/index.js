import express from "express";
import renderer from "../utils/renderer";

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send(renderer.renderFullPage());
});

module.exports = router;
