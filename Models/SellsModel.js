const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SellsSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
  },
  product: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },

  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },

  amount: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
});

module.exports = mongoose.model('sells', SellsSchema);
