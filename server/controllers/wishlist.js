const Wislist = require("../models/Wishlist");
/*
get wishlist
delete Item
add Item
*/

const getWishlist = async (req, res) => {
  try {
    const { wishlist: id } = req.params;
    const wishlist = await Wislist.findById(id).populate("wishlist.shoe");
    return res.status(200).json(wishlist);
  } catch (err) {
    console.log(err, "error @ getWishlist controller");
    return res.status(500).send(err);
  }
};
const addToWishlist = async (req, res) => {
  try {
    const { wishlist: id } = req.params;
    const { shoe: shoeId } = req.body;
    let wishlist = await Wislist.findById(id).populate("wishlist.shoe");
    for (let { shoe } of wishlist.wishlist) {
      if (shoe._id == shoeId) {
        return res.status(200).send("product already exist");
      }
    }
    wishlist.wishlist = [...wishlist.wishlist, req.body];
    wishlist.save();
    return res.status(200).json(wishlist);
  } catch (err) {
    console.log(err, "error @ getWishlist controller");
    return res.status(500).send(err);
  }
};
const deleteFromWishlist = async (req, res) => {
  try {
    const { wishlist: id, product } = req.params;
    let wishlist = await Wislist.findById(id).populate("wishlist.shoe");
    wishlist.wishlist = wishlist.wishlist.filter(({ shoe }) => {
      console.log(shoe._id.toString(), product);
      return shoe._id.toString() !== product;
    });
    wishlist.save();
    return res.status(200).json(wishlist);
  } catch (err) {
    console.log(err, "error @ getWishlist controller");
    return res.status(500).send(err);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { wishlist: id } = req.params;
    const wishlist = await Wislist.findById(id);
    if (!wishlist) return res.status(404).send("wishlist does not exist");
    wishlist.wishlist = [];
    wishlist.save();
    return res.status(200).json(wishlist);
  } catch (err) {
    console.log(err, "error @ deleteWishlist controller");
    return res.status(500).send("error @ wislist check console");
  }
};

module.exports = {
  deleteFromWishlist,
  addToWishlist,
  getWishlist,
  deleteWishlist,
};
