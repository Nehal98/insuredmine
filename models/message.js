const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  day: { type: String, required: true },       // e.g. 'Monday', 'Tuesday' or cron format '1-5' etc.
  time: { type: String, required: true },      // e.g. '14:30'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
