const _ = require('lodash');
const User = require("./models/user");
const neo4jConfig = require("../config/neo4j");
const encryption = require("../utils/encryption");

const picturesPath = '/img/users/';

const USERS_PROJECTION = "_id name username email roles photo phoneNumber";

const create = function(data, callback) {
  User.create(data, function(err, results) {
    if (err) {
      return callback(err);
    }

    const session = neo4jConfig.getDriver().session();

    const cypherResults = (_.isArray(results) ? results : [results]);

    const cypherQuery = `CREATE ${cypherResults.map(function(result, index) { return `(:User {id: $idParam${index}, name: $nameParam${index}})` }).join(",")}`;

    session.run(
      cypherQuery,
      cypherResults.reduce(function(acc, result, index) {
        acc[`idParam${index}`] = result._id.toString();
        acc[`nameParam${index}`] = result.name.toString();

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
}

module.exports = {
  seedInitial: function(callback) {
    User.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = ["Svilen", "William", "James", "Harper", "Mason", "Evelyn", "Ella", "Avery", "Jackson", "Scarlett", "Madison", "Carter", "Wyatt", "Jack", "Lily", "Eleanor", "Grayson", "Lillian", "Addison", "Aubrey", "Julian"];
        const salt = encryption.generateSalt();
        const hashPass = encryption.generateHashedPassword(salt, "password");

        create(names.map(function(name) {
          const username = name.toLowerCase(name);

          const userObj = {
            name,
            username: username,
            email: `${username}@gmail.com`,
            phoneNumber: "(000) 123-4567",
            roles: username === "svilen" ? ["admin"] : [],
            salt,
            hashPass
          }

          if (username === "svilen") {
            userObj.photo = `${picturesPath}6726862.jpeg`
          }

          return userObj;
        }), callback);
      } else {
        callback();
      }
    });
  },
  getAuthByUsername: function(username, callback) {
    User.findOne({ username }).select("_id name username email roles salt hashPass").exec(callback);
  },
  getAll: function(callback) {
    User.find().select(USERS_PROJECTION).exec(callback);
  },
  getById: function(id, callback) {
    User.findOne({ _id: id }).select(USERS_PROJECTION).exec(callback);
  },
  friend: function(friendId, userId, callback) {
    const session = neo4jConfig.getDriver().session();

    const cypherQuery = `MATCH (j:User {id: $userIdParam}) MATCH (m:User {id: $friendIdParam}) MERGE (j)-[r:IS_FRIENDS_WITH]->(m) RETURN j, r, m`;

    session.run(cypherQuery, {
      userIdParam: userId.toString(),
      friendIdParam: friendId.toString()
    }).then(function(result) {
      session.close();
      callback(null, result);
    }).catch(function(err) {
      session.close();
      callback(err);
    });
  },
  create
};
