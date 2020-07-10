const express = require("express");
const auth = require("../config/auth");

const router = express.Router();

router.post('/', auth.logout);

module.exports = router;
