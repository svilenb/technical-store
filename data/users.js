const User = require("./models/user");
const neo4jConfig = require("../config/neo4j");

module.exports = {
  seedInitial: function(callback) {
    User.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = ["William", "James", "Harper", "Mason", "Evelyn", "Ella", "Avery", "Jackson", "Scarlett", "Madison", "Carter", "Wyatt", "Jack", "Lily", "Eleanor", "Grayson", "Lillian", "Addison", "Aubrey", "Julian"];

        User.create(names.map(function(name) {
          return {
            name,
            email: `${name.toLowerCase(name)}@gmail.com`,
            roles: []
          }
        }), function(err, results) {
          if(err) {
            return callback(err);
          }

          const session = neo4jConfig.getDriver().session();

          const cypherQuery = `CREATE ${results.map(function(result, index) { return `(:User {id: $idParam${index}})` }).join(",")}`;

          session.run(
            cypherQuery,
            results.reduce(function(acc, result, index) {
              acc[`idParam${index}`] = result._id.toString();

              return acc;
            }, {})
          ).then(function(result) {
            session.close();
            callback(null, results);
          }).catch(function(err) {
            session.close();
            callback(err);
          });
        });
      } else {
        callback(null, collection);
      }
    });
  }
};
