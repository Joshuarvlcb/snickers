const mongoose = require("mongoose");

const Wishlist = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wishlist: [
    {
      shoe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Wishlist", Wishlist);
