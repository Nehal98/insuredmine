const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  category_name: { type: String, required: true }
});

module.exports = mongoose.model('Lob', lobSchema);
