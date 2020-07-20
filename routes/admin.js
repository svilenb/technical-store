const express = require("express");
const adminController = require("../controllers/admin");
const auth = require("../config/auth");

const router = express.Router();

router.get("/categories", auth.isInRole('admin'), adminController.getCategories);

module.exports = router;
