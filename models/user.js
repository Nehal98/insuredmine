const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  dob: String,
  address: String,
  phone: String,
  state: String,
  zip: String,
  email: String,
  gender: String,
  userType: String
});

module.exports = mongoose.model('User', userSchema);
