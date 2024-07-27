const mongoose = require('mongoose');

// Create Category collection to DB
const CategorySchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Category', CategorySchema);