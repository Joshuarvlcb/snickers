import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseURL } from "./util/auth";
import styles from "../styles/Shoe.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Size from "./components/Size";
import { addToCart, deleteProduct, getCart } from "./util/cartActions";
import {
  deleteWishlistItem,
  addWishlistItem,
  getWishlist,
} from "./util/wishlistActions";

const Shoe = ({ user }) => {
  const shoeSizes = [
    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
  ];
  const router = useRouter();
  /*
import addWishlistItem controller

have a state that keeps track if item is in wishlist
create onClick on wishlist button that will add Item to wishlist update state

??how do I know if item is in wishlist?
every time we see a different shoe we will check if item is wishlist 
update state if item is in wishlist

??how can I remove item from wishlist
if item is in wishlist set state to false




*/

  /*
  make request to add to cart when we click on add to cart

  have state to keep track of product 
  if its added state will be true

  make request to delete  cart when we click on already in cart

  if product is false add to cart 
  else remove from cart
   
  /*
when i click size i want to add clicked className of the size i clicked on
state that keeps track of which size i clicked on

compare size value with state
*/

  const [sizeValue, setSize] = useState("");
  /*

  */
  const [product, setProduct] = useState(false);
  const [shoe, setShoe] = useState({});
  const [wishlist, setWishlist] = useState(false);
  /*
product state 

  if product true remove
  if product false add


  if product is in cart true
  if product is not cart false

    IsInCart gets called each time we click on button

    once we add or remove we update state
    
*/
  useEffect(() => {
    const getShoe = async () => {
      const shoe = await axios.get(`${baseURL}shoes/${router.query.shoe}`);
      setShoe(shoe.data);
    };
    getShoe();
  }, [router.query.shoe]);
  useEffect(() => {
    //check to see if item is in wishlist
    //if it is update state
    const isInWishlist = async () => {
      const wishlist = await getWishlist(user.wishlist);
      let state = false;
      wishlist.forEach((obj) => {
        if (obj.shoe._id == router.query.shoe) state = true;
      });
      if (state) setWishlist(true);
      else setWishlist(false);
    };
    isInWishlist();
    const isInCart = async () => {
      const cart = await getCart(user.cart);
      let state = false;
      cart.forEach((obj) => {
        if (obj.product._id == router.query.shoe) state = true;
      });
      if (state) setProduct(true);
      else setProduct(false);
    };
    isInCart();
  }, [shoe]);
  return (
    <div className={styles["shoe-container"]}>
      <div className={styles["shoe-img"]}>
        <img className={styles["image"]} src={shoe.pic} alt="" />
      </div>
      <div className={styles["info"]}>
        <div className={styles["shoe-brand"]}>{shoe.brand}</div>
        <div className={styles["shoe-name"]}>{shoe.name}</div>
        <div className={styles["shoe-price"]}>${shoe.price}</div>
        <div className={styles["size-container"]}>
          {shoeSizes.map((size, i) => {
            /*
            remove and add clicked class
            
            to remove
            how to check if element has clicked class

            to add
            */
            return (
              <Size size={size} state={sizeValue} setSize={setSize} key={i} />
            );
          })}
        </div>
        <div className={styles["button-container"]}>
          <button
            onClick={() => {
              if (product) {
                deleteProduct(user.cart, shoe._id, setProduct);
              }

              if (!product) {
                addToCart(user.cart, shoe._id, setProduct);
              }
            }}
            className={styles["cart-button"]}
          >
            {product ? "IN BAG" : "ADD TO BAG"}
          </button>
          <button
            className={styles["heart-button"]}
            onClick={() => {
              if (wishlist) {
                deleteWishlistItem(user.wishlist, shoe._id, null, setWishlist);
              }

              if (!wishlist) {
                addWishlistItem(user.wishlist, shoe._id, setWishlist);
              }
            }}
          >
            FAVORITE{" "}
            {wishlist ? (
              <AiFillHeart className={styles.heart} />
            ) : (
              <AiOutlineHeart className={styles.heart} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Shoe.getInitialProps = async (ctx) => {
//   try {
//     console.log("updating shoe");
//     const { shoe: id } = ctx.query;
//     const shoe = await axios.get(`${baseURL}shoes/${id}`);
//     return { shoe: shoe.data };
//   } catch (err) {
//     console.log(err, "error in shoe page");
//     return { error: "error" };
//   }
// };

export default Shoe;
