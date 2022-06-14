/*
create cart

addToCart

removeFromCart

delete cart

get cart by id
*/
const { populate } = require("sneaks-api/models/Sneaker");
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
    /* */
    const { cartId } = req.params;
    const { product: p } = req.body;
    if (!cartId || !p)
      return res.status(404).send("you need a cartId or product or quantity");

    const cart = await CartModel.findById(cartId);
    console.log(cart);
    if (!cart) return res.status(401).send("cart does not exist");
    for (let { product } of cart.products) {
      if (product.toString() == p) {
        return res.status(200).send("product already exist");
      }
    }

    cart.products = [...cart.products, req.body];
    cart.populate("products.product");
    await cart.save();

    return res.status(200).send({ cart, length: cart.length });
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ addToCart");
  }
};
const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartModel.findById(cartId).populate("products.product");
    if (!cart) return res.status(404).send("cart does not exist");

    return res.status(207).json({ cart: cart, length: cart.products.length });
  } catch (err) {
    console.log(err);
    return res.status(401).send("error @ getCart");
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { cartId, productId: product } = req.params;

    console.log(cartId, product);
    if (!cartId || !product)
      return res.status(404).send("you need a cartId or product");

    let cart = await CartModel.findById(cartId);

    if (!cart) return res.status(404).send("cart does not exist");

    cart.products = cart.products.filter(({ product: p }) => {
      console.log(p.toString(), product);
      return p.toString() !== product;
    });
    cart.populate("products.product");
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
    const cart = await CartModel.findById(cartId);
    if (!cart) return res.status(404).send("cart does not exist");
    cart.products = [];
    cart.save();
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
