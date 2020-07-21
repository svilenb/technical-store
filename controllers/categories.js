const async = require("async");
const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");
const productsData = require("../data/products");

const CONTROLLER_NAME = "categories";

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

        res.render(CONTROLLER_NAME + "_products", {
          products,
          category
        });
      });
    });
  },
  getSubcategoryProducts: function(req, res, next) {
    categoriesData.getByName(req.params.categoryName, function(err, category) {
      if (err) {
        return next(err);
      }

      subcategoriesData.getByName(req.params.subcategoryName, function(err, subcategory) {
        if (err) {
          return next(err);
        }

        productsData.getBySubcategoryId(subcategory._id, function(err, products) {
          if (err) {
            return next(err);
          }

          res.render(CONTROLLER_NAME + "_products", {
            products,
            category,
            subcategory
          });
        });
      });
    });
  },
  create: function(req, res, next) {
    categoriesData.create(req.body, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send("Success");
    });
  },
  patch: function(req, res, next) {
    categoriesData.updateById(req.params.id, req.body, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send("Success");
    });
  }
};
