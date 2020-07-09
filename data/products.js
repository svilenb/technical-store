const Product = require("./models/product");

const picturesPath = '\\img\\products\\';

module.exports = {
  seedInitial: function(data, callback) {
    Product.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        const tvs = [
          {
            name: "TV LG 20MT48DF-PZ TV+MONITOR",
            model: "20MT48DF-PZ",
            price: 219,
            photos: [
              `${picturesPath}11463897088030.jpg`,
              `${picturesPath}11463897874462.jpg`,
            ],
            brand: data.brands[0],
          },
          {
            name: "TV LG 32LM550BPLB LED 32.0",
            model: "32LM550BPLB",
            price: 329,
            photos: [
              `${picturesPath}11651328999454.jpg`,
              `${picturesPath}11651329785886.jpg`,
              `${picturesPath}11651329982494.jpg`,
            ],
            brand: data.brands[0],
          },
          {
            name: "TV LG 32LM630BPLA LED SMART TV, WEBOS",
            model: "32LM630BPLA",
            price: 399,
            photos: [
              `${picturesPath}11768965300254.jpg`,
              `${picturesPath}11768966086686.jpg`,
            ],
            brand: data.brands[0],
          },

          {
            name: "TV PANASONIC TX-65FZ950E 4K Ultra HD OLED SMART TV",
            model: "TX-65FZ950E",
            price: 2699,
            photos: [
              `${picturesPath}11479762108446.jpg`,
              `${picturesPath}11479762501662.jpg`,
              `${picturesPath}11479762894878.jpg`,
              `${picturesPath}11479763091486.jpg`,
            ],
            brand: data.brands[1]
          },
          {
            name: "TV PANASONIC TX-65GZ1500E 4K Ultra HD OLED SMART TV",
            model: "TX-65GZ1500E",
            price: 3999,
            photos: [
              `${picturesPath}11704007032862.jpg`,
              `${picturesPath}11704007819294.jpg`,
              `${picturesPath}11704008015902.jpg`,
            ],
            brand: data.brands[1]
          }
        ];

        Product.create([
          ...tvs.map(function(tv) {
            return {
              ...tv,
              category: data.categories[0],
              subcategory: data.subcategories[0],
            }
          })
        ], callback);
      } else {
        callback(null, collection);
      }
    });
  }
};
