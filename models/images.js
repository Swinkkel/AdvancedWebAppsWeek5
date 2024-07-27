const mongoose = require('mongoose');

// Create Image collection to DB
const ImageSchema = new mongoose.Schema({
    name: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer
});

module.exports = mongoose.model('Image', ImageSchema);