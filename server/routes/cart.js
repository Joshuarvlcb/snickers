const router = require("express").Router();

const {
  createCart,
  addToCart,
  getCart,
  removeItemFromCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

router.route("/").post(createCart);
router
  .route("/:cartId")
  .post(addToCart)
  .get(getCart)
  .delete(deleteCart)
  .put(updateCart);
router.route("/:cartId/:productId").delete(removeItemFromCart);

module.exports = router;
