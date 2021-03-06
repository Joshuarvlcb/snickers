const mongoose = require("mongoose");

/*
products quatity
*/
const Cart = mongoose.Schema({
  //get reference from shoes model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
