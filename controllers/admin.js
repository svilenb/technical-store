const categoriesData = require("../data/categories");

const CONTROLLER_NAME = "admin";

module.exports = {
  getCategories: function(req, res, next) {
    categoriesData.getAll(function(err, categories) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_categories", {
        categories
      });
    });
  },
  getCreateCategory: function(req, res, next) {
    res.render(CONTROLLER_NAME + "_create_category");
  },
  getCategory: function(req, res, next) {
    categoriesData.getById(req.params.id, function(err, category) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_category", {
        category
      });
    });
  }
};
