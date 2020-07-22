const async = require("async");
const productsData = require("../data/products");
const recommendationData = require("../data/recommendation");

const CONTROLLER_NAME = "products";

module.exports = {
  getProduct: function(req, res, next) {
    async.series({
      product: function(callback) {
        productsData.getById(req.params.id, callback);
      },
      friendsPurchasedProduct: function(callback) {
        if (req.user) {
          recommendationData.getFriendsPurchasedProduct(req.user._id, req.params.id, callback);
        } else {
          callback();
        }
      },
      friendsWithAcquaintancePurchasedProduct: function(callback) {
        if (req.user) {
          recommendationData.getFriendsWithAcquaintancePurchasedProduct(req.user._id, req.params.id, callback);
        } else {
          callback();
        }
      }
    }, function (err, results) {
      res.render(CONTROLLER_NAME + "_view", {
        product: results.product,
        friendsPurchasedProduct: results.friendsPurchasedProduct,
        friendsWithAcquaintancePurchasedProduct: results.friendsWithAcquaintancePurchasedProduct
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
