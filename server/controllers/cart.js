/*
create cart

addToCart

removeFromCart

delete cart

get cart by id
*/
const CartModel = require("../models/Cart");

const createCart = async (req, res) => {
  try {
    const cart = await CartModel.create({ products: [] });
    res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    return res.send(401).send("error @ createCart");
  }
};
//update quantity
const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product, quantity } = req.body;
    //??cart:621ef366a8584410415ac256
    //??producyId:621acc5766b16c7c7d800e21
    if (!cartId || !product || !quantity)
      return res.status(404).send("you need a cartId or product or quantity");

    //!!ID
    const cart = await CartModel.findById(cartId);
    console.log(cart);
    if (!cart || cart.products.length == 0)
      return res.status(401).send("cart does not exist or no products");

    const cartItem = await cart.products.find(
      ({ product }) => product._id === product
    );
    //??how to know if we are incrementing or decrementing
    console.log(cartItem);
    cartItem.quantity > quantity ? cartItem.quantity-- : cartItem.quantity++;
    cart.save();
    return res.status(200).json({ cartItem });
  } catch (err) {
    console.log(err);
    res.status(401).send("error @ update cart");
  }
};
const addToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product, quantity } = req.body;
    if (!cartId || !product || !quantity)
      return res.status(404).send("you need a cartId or product or quantity");
    //!!populate
    const cart = await CartModel.findById(cartId).populate("products.product");
    if (!cart) return res.status(401).send("cart does not exist");
    for (let { product: p } of cart.products) {
      if (p._id == product)
        return res.status(410).send("this product already exist in cart");
    }
    cart.products = [...cart.products, req.body];
    await cart.save();

    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ addToCart");
  }
};
const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartModel.findById(cartId);
    if (!cart) return res.status(404).send("cart does not exist");

    return res.status(200).json(cart); //:)
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ getCart");
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { cartId, itemId: product } = req.params;
    if (!cartId || !product)
      return res.status(404).send("you need a cartId or product");

    let cart = await CartModel.findById(cartId);

    if (!cart) return res.status(404).send("cart does not exist");

    cart.products = cart.products.filter(({ product: p }) => {
      console.log(p.toString(), product);
      return p.toString() !== product;
    });

    await cart.save();
    return res.status(200).send({ cart });
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ removeItemFromCart");
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartModel.findOneAndDelete({ _id: cartId });
    if (!cart) return res.status(404).send("cart does not exist");
    return res.status(200).json({ cart: { products: [] } });
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ removeItemFromCart");
  }
};

module.exports = {
  createCart,
  addToCart,
  getCart,
  removeItemFromCart,
  updateCart,
  deleteCart,
};
