const express = require("express");
const categoriesController = require("../controllers/categories");

const router = express.Router();

router.get("/:categoryName", categoriesController.getProducts);
router.get("/:categoryName/subcategory/:subcategoryName", categoriesController.getSubcategoryProducts);

module.exports = router;
