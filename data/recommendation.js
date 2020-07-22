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
  },
  getFriendsWithAcquaintancePurchasedProduct: function(userId, productId, callback) {
    const session = neo4jConfig.getDriver().session();

    const cypherQuery = `MATCH (me:User {id: $userIdParam})-[:IS_FRIENDS_WITH]->(f:User)-[:IS_FRIENDS_WITH]->(fof:User)-[:PURCHASED]->(p:Product {id: $productIdParam}) WHERE me <> fof AND NOT (me)-[:IS_FRIENDS_WITH]->(fof) return f.name as name, f.id as id`;

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
