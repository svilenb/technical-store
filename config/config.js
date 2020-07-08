var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
  development: {
    rootPath,
    db: 'mongodb://localhost/tecthstore',
  },
  production: {
    rootPath
  }
};
