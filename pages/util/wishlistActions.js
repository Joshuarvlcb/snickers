import axios from "axios";
import { baseURL } from "./auth";

export const getWishlist = async (wishlistId) => {
  const wishlist = await axios.get(baseURL + "wishlist/" + wishlistId);
  return wishlist.data.wishlist;
};
export const deleteWishlist = async (wishlistId, setProduct) => {
  await axios.delete(baseURL + "wishlist/" + wishlistId);
  setProduct([]);
};
export const deleteWishlistItem = async (
  wishlistId,
  product,
  setProducts,
  setWishlist
) => {
  const wishlist = await axios.delete(
    baseURL + "wishlist/" + wishlistId + "/" + product
  );

  if (setProducts) {
    console.log(wishlist.data);
    setProducts(wishlist.data.wishlist);
  }
  if (setWishlist) {
    setWishlist(false);
  }
  return wishlist;
};
export const addWishlistItem = async (wishlistId, product, setWishlist) => {
  const wishlist = await axios.post(baseURL + "wishlist/" + wishlistId, {
    shoe: product,
  });
  console.log(wishlist);
  if (setWishlist) {
    setWishlist(true);
  }
  return wishlist;
};
