const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const MilkSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
  },
  cattle: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  snf: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model('milk', MilkSchema);
