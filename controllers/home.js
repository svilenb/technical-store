const async = require("async");
const categoriesData = require("../data/categories");
const subcategoriesData = require("../data/subcategories");

const CONTROLLER_NAME = "home";

module.exports = {
  getIndex: function(req, res, next) {
    async.parallel({
      categories: function(callback) {
        categoriesData.getAll(callback);
      },
      subcategories: function(callback) {
        subcategoriesData.getAll(callback);
      }
    }, function(err, results) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_index", results);
    });
  }
};
