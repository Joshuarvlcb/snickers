const router = require("express").Router();

const {
  addToWishlist,
  deleteFromWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controllers/wishlist");

router
  .route("/:wishlist")
  .get(getWishlist)
  .post(addToWishlist)
  .delete(deleteWishlist);

router.route("/:wishlist/:product").delete(deleteFromWishlist);

module.exports = router;
