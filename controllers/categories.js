const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");
const productsData = require("../data/products");

module.exports = {
  getProducts: function(req, res, next) {
    categoriesData.getByName(req.params.categoryName, function(err, category) {
      if (err) {
        return next(err);
      }

      productsData.getByCategoryId(category._id, function(err, products) {
        if (err) {
          return next(err);
        }

        res.render("products", {
          products
        });
      });
    });
  },
  getSubcategoryProducts: function(req, res, next) {
    subcategoriesData.getByName(req.params.subcategoryName, function(err, category) {
      if (err) {
        return next(err);
      }

      productsData.getByCategoryId(category._id, function(err, products) {
        if (err) {
          return next(err);
        }

        res.render("products", {
          products
        });
      });
    });
  }
};