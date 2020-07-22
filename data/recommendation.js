const neo4jConfig = require("../config/neo4j");

module.exports = {
  getFriendsPurchasedProduct: function(userId, productId, callback) {
    const session = neo4jConfig.getDriver().session();

    const cypherQuery = `MATCH(me:User {id: $userIdParam})-[:IS_FRIENDS_WITH]->(friend:User)-[:PURCHASED]->(p:Product {id: $productIdParam}) return friend.name AS name, friend.id AS id`;

    session.run(cypherQuery, {
      userIdParam: userId.toString(),
      productIdParam: productId.toString()
    }).then(function(result) {
      const results = result.records.map(function(record) {
        return {
          id: record.get("id"),
          name: record.get("name")
        }
      });

      session.close();
      callback(null, results);
    }).catch(function(err) {
      session.close();
      callback(err);
    });
  }
};
