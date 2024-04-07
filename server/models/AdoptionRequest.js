const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  petData: {
    type: String, // Store pet data as a string
    required: true,
  },
  adopteeName: {
    type: String,
    required: true,
  },
  adopteeMobile: {
    type: String,
    required: true,
  },
  adopteeEmail: {
    type: String,
    required: true,
  },
  
  // Add other fields as needed
});

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);

module.exports = AdoptionRequest;
