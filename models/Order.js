const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  comment: String,
  phone: String,
  street: String,
  time: String,
  order: Array,
  updated_date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', OrderSchema);
