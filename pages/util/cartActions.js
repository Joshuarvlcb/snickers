import axios from "axios";

import { addingCookie, baseURL } from "./auth";

export const getCart = async (cartId) => {
  /*
    make a request to cardId endpoint

    find cart in collection
    return cart
    */
  const cart = await axios.get(baseURL + "cart/" + cartId);
  if (!cart) return;
  return cart.data.cart.products;
};
export const deleteCart = async (cartId, setProducts) => {
  await axios.delete(baseURL + "cart/" + cartId);
  setProducts([]);
};

export const deleteProduct = async (
  cartId,
  productId,
  setProduct,
  setProducts
) => {
  /*
    make a request to cardId endpoint

    find cart in collection add product Id in cart 
    return cart
    */
  /*
  check to see if product exixt in cart 
  if true setState to false
  */
  /*
rerenders state will be true and we dont need to check if product exist in cart because we already know it does
*/
  if (setProduct) {
    setProduct(false);
  }
  const cart = await axios.delete(baseURL + "cart/" + cartId + "/" + productId);
  if (!cart) return;
  console.log(cart);
  if (setProducts) {
    setProducts(cart.data.cart.products);
  }
  return cart;
};
export const addToCart = async (cartId, productId, setProduct) => {
  /*
    make a request to cardId endpoint

    find cart in collection delete product Id in cart 
    return cart
    */
  /*
  check to see if product exixt in cart 
  if true setState to true
  */

  const cart = await axios.post(baseURL + "cart/" + cartId, {
    product: productId,
  });
  if (!cart) return;
  setProduct(true);

  return cart;
};
