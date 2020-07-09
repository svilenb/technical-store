const neo4j = require('neo4j-driver');

let driver;

module.exports = {
  init: function(config, callback) {
    driver = neo4j.driver(config.neo4jdb, neo4j.auth.basic(config.neo4jUsername, config.neo4jPassword))
  },
  getDriver: function() {
    return driver;
  }
};
