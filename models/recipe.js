const mongoose = require('mongoose');

// Create Recipes collection to DB
let recipeSchema = new mongoose.Schema({
  name: String,
  instructions: [String],
  ingredients: [String],
});

module.exports = mongoose.model('recipes', recipeSchema);