const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },

  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },

  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },

  originalPrice: {
    type: Number,
  },

  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },

  image: {
    type: String,
  },

  rating: {
    type: Number,
  },

  soldOut: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
