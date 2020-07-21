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
  },
  buy: function(req, res, next) {
    productsData.buy(req.params.id, req.user._id, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send("Success");
    });
  }
};
