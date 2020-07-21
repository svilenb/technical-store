const express = require("express");
const productsController = require("../controllers/products");
const auth = require("../config/auth");

const router = express.Router();

router.get("/:id", productsController.getProduct);
router.post("/:id/buy", auth.isAuthenticated, productsController.buy);

module.exports = router;
