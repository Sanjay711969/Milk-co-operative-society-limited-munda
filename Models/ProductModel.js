const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductCode: {
    type: String,
    required: true,
    unique: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('products', ProductSchema);
