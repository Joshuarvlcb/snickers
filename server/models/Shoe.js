const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  popular: {
    type: Boolean,
    required: true,
  },
  newest: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Shoe", ShoeSchema);
