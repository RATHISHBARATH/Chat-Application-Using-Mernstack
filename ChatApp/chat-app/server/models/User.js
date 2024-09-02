const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  otp: String,
  otpExpires: Date
});

module.exports = mongoose.model('User', userSchema);
