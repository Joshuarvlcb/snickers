const mongoose = require("mongoose");

/*
products quatity
*/
const Cart = mongoose.Schema({
  //get reference from shoes model
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
