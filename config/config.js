var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
  development: {
    rootPath,
    mongodb: "mongodb://localhost/tecthstore",
    neo4jdb: "neo4j://localhost",
    neo4jUsername: "neo4j",
    neo4jPassword: "magicunicorns"
  },
  production: {
    rootPath
  }
};
