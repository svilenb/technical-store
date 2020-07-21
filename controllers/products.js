const productsData = require("../data/products");

const CONTROLLER_NAME = "products";

module.exports = {
  getProduct: function(req, res, next) {
    productsData.getById(req.params.id, function(err, product) {
      if (err) {
        return next(err);
      }

      res.render(CONTROLLER_NAME + "_view", {
        product
      });
    });
  }
};
