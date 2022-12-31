const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (val) {
        if (val) return;
      },
      message: "The name of the product can't be empty",
    },
  },
  price: {
    type: Number,
    required: [true, "A product must have price"],
  },
  image: {
    type: String,
    default: `Image of the ${this.name}`,
  },
  description: {
    type: String,
    default: "Branded shoes",
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
