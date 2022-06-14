const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = mongoose
  .Schema({
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
    },

    password: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
    },
  })
  .pre("save", async function (next) {
    //this.password = encrypted password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

//create jwt method
UserModel.methods.createJwt = async function () {
  //create jwt token
  const token = jwt.sign(
    {
      email: this.email,
      username: this.usermame,
      password: this.password,
      id: this._id,
    },
    process.env.JWT_SECRET
  );
  return token;
  //return jwt token
};
//create compare password method
UserModel.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserModel);
