const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  retailPrice: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shoe", ShoeSchema);
