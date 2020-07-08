const User = require("./models/user");

module.exports = {
  seedInitial: function(callback) {
    User.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const names = ["William", "James", "Harper", "Mason", "Evelyn", "Ella", "Avery", "Jackson", "Scarlett", "Madison", "Carter", "Wyatt", "Jack", "Lily", "Eleanor", "Grayson", "Lillian", "Addison", "Aubrey", "Julian", "Lincoln", "Hazel", "Audrey", "Lucy", "Everly", "Hudson", "Christian", "Hunter", "Landon", "Willow", "Kinsley", "Easton", "Colton", "Robert", "Greyson", "Hailey", "Austin", "Cooper"];

        User.create(names.map(function(name) {
          return {
            name,
            email: `${name.toLowerCase(name)}@gmail.com`,
            roles: []
          }
        }), callback);
      } else {
        callback();
      }
    });
  }
};
