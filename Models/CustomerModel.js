const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
    unique: true,
  },
  customer_type: {
    type: String,
    required: true,
  },
  cow: {
    type: Boolean,
    default: false,
  },
  bufflo: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('customer', CustomerSchema);
