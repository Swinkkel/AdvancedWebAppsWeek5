const mongoose = require('mongoose');

// Create Recipes collection to DB
let recipeSchema = new mongoose.Schema({
  instructions: [String],
  ingredients: [String],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  name: String,
});

module.exports = mongoose.model('recipes', recipeSchema);