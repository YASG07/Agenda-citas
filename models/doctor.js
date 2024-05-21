const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  gender: String,
  phone: String,
  email: String,
  specialty: String,
  professionalID: String,
  office: String,
  atentionDays: [String],
  atentionHours: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
