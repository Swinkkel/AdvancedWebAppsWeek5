const mongoose = require('mongoose');

let recipeSchema = new mongoose.Schema({
  name: String,
  instructions: [String],
  ingredients: [String],
});



module.exports = mongoose.model('Recipe', recipeSchema);