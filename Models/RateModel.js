const mongoose = require('mongoose');

const RateTable = new mongoose.Schema({
  snf: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('RateTable', RateTable);
