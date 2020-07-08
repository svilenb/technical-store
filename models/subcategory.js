import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" }
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = {
  seedInitial: function(categories, callback) {
    Subcategory.find({}).exec(function(err, collection) {
      if (collection.length === 0) {
        Subcategory.create([
          { name: "TV", category: categories[0]._id },
          { name: "Soundbars", category: categories[0]._id },
          { name: "Home Theaters", category: categories[0]._id },
          { name: "TV accessories", category: categories[0]._id },
          { name: "Audio systems", category: categories[0]._id },
          { name: "Game consoles", category: categories[0]._id },
          { name: "Games", category: categories[0]._id },

          { name: "Mobile phones", category: categories[1]._id },
          { name: "Tablets", category: categories[1]._id },
          { name: "Smart watches", category: categories[1]._id },
          { name: "Headphones", category: categories[1]._id },

          { name: "Laptops", category: categories[2]._id },
          { name: "Desktops", category: categories[2]._id },
          { name: "Monitors", category: categories[2]._id },
          { name: "Printers And Scaners", category: categories[2]._id },
          { name: "PC Software", category: categories[2]._id },

          { name: "Mice And Keyboards", category: categories[3]._id },
          { name: "Web Cams", category: categories[3]._id },
          { name: "Laptop bags", category: categories[3]._id },
          { name: "CD and DVD discs", category: categories[3]._id },
          { name: "Coolers", category: categories[3]._id },
          { name: "Headphones And Microphones", category: categories[3]._id },
          { name: "PC Speakers", category: categories[3]._id },

          { name: "DSLR cameras", category: categories[4]._id },
          { name: "Mirrorless cameras", category: categories[4]._id },
          { name: "Compacts cameras", category: categories[4]._id },
          { name: "Instant digital cameras and consumables", category: categories[4]._id },
          { name: "Lenses", category: categories[4]._id },
          { name: "Flashes", category: categories[4]._id },
          { name: "Camcoders", category: categories[4]._id },
          { name: "Photo printers and scanners", category: categories[4]._id },
          { name: "Binoculars and telescopes", category: categories[4]._id },

        ], callback);
      } else {
        callback();
      }
    });
  }
};
