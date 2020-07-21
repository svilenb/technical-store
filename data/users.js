const User = require("./models/user");
const neo4jConfig = require("../config/neo4j");
const encryption = require("../utils/encryption");

module.exports = {
  seedInitial: function(callback) {
    User.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = ["Svilen", "William", "James", "Harper", "Mason", "Evelyn", "Ella", "Avery", "Jackson", "Scarlett", "Madison", "Carter", "Wyatt", "Jack", "Lily", "Eleanor", "Grayson", "Lillian", "Addison", "Aubrey", "Julian"];
        const salt = encryption.generateSalt();
        const hashPass = encryption.generateHashedPassword(salt, "password");

        User.create(names.map(function(name) {
          const username = name.toLowerCase(name);

          return {
            name,
            username: username,
            email: `${username}@gmail.com`,
            roles: username === "svilen" ? ["admin"] : [],
            salt,
            hashPass
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
  },
  getAuthByUsername: function(username, callback) {
    User.findOne({ username }).select("_id name username email roles salt hashPass").exec(callback);
  },
  getById: function(id, callback) {
    User.findOne({ _id: id }).select("_id name username email roles").exec(callback);
  },
  create: function(data, callback) {
    User.create(data, callback);
  }
};
