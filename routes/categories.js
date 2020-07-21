const express = require("express");
const categoriesController = require("../controllers/categories");
const auth = require("../config/auth");

const router = express.Router();

router.get("/:categoryName", categoriesController.getProducts);
router.get("/:categoryName/subcategory/:subcategoryName", categoriesController.getSubcategoryProducts);
router.post("/create", auth.isInRole("admin"), categoriesController.create);
router.patch("/:id", auth.isInRole("admin"), categoriesController.patch);

module.exports = router;
