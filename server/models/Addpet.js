const mongoose = require('mongoose');

const addpetSchema = new mongoose.Schema({
  petName: String,
  petCategory: String,
  petAge: String,
  petImage: String,
  petGender: String,
  petAmount: Number,
  ownerName: String,
  ownerMobile: {
    type: Number,
    validate: {
      validator: function(v) {
        // Check if the mobile number is a 10-digit number
        return /^\d{10}$/.test(v);
      },
      message: 'Mobile number must be a 10-digit number.',
    },
  },
  ownerAddress: String,
  ownerDescription: String,
});

const Addpet = mongoose.model('Addpet', addpetSchema);

module.exports = Addpet;
