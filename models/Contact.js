const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  syy:     { type: String, required: true },
  firstname: { type: String, required: true },
  email:   { type: String, required: true },
  planet:  { type: String, default: 'Ei valittu' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);