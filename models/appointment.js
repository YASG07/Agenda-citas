const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  treatment: String,
  patient: {
    name: String,
    lastName: String,
    phone: String,
    email: String,
  },
  price: Number,
  address: String,
  doctor: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
