const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: String,
  ingredients: String,
  description: String,
  image: String,
  sliderImages: [String],
  isSpecial: Boolean,
  week: [String]
});

module.exports = mongoose.model('Dish', DishSchema);
