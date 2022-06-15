import React, { useState } from "react";
import { baseURL } from "./util/auth";
import {
  deleteWishlistItem,
  getWishlist,
  deleteWishlist,
} from "./util/wishlistActions";
import { parseCookies } from "nookies";
import axios from "axios";
import Shoe from "./components/Shoe";
import styles from "../styles/Cart.module.scss";
/*
make a request to server to get wishlist
use getinitialProps to get wishlist
??I need make a request to get profile from user to get the wishlistId

state for wishlist = wishlist prop
use deleteAction to delete item from wishlist
update state whenever I delete product 

map over wishlist if length > 0
if not return nothing in wishlist
each product will have a button to delete 


actions for page
calculate total 
delete all items from wishlist

*/

const Wishlist = ({ user, wishlist }) => {
  const [products, setProducts] = useState(wishlist);
  return (
    <div className={styles["cart"]}>
      <h1 className={styles["title"]}>Wishlist</h1>
      <div className={styles["cart-container"]}>
        {products.length >= 1 ? (
          products.map((shoe, i) => {
            return (
              <div className={styles["product"]} key={i}>
                <Shoe
                  id={shoe.shoe._id}
                  pic={shoe.shoe.pic}
                  brand={shoe.shoe.brand}
                  name={shoe.shoe.name}
                  delete={true}
                />
                <div
                  className={styles["delete-button"]}
                  onClick={() => {
                    deleteWishlistItem(
                      user.wishlist,
                      shoe.shoe._id,
                      setProducts
                    );
                  }}
                >
                  DELETE
                </div>
              </div>
            );
          })
        ) : (
          <h2>
            You haven't saved any items to your wishlist yet. Start shopping and
            add your favorite items to your wishlist.
          </h2>
        )}
      </div>
      {products.length >= 1 ? (
        <>
          {" "}
          <div className={styles["total-container"]}>
            <div className={styles["subtotal"]}>
              SUBTOTAL- $
              {products.reduce((acc, shoe) => {
                return acc + shoe.shoe.price;
              }, 0)}
              .00
            </div>
            <div className={styles["checkout"]}>
              <button
                onClick={() => deleteWishlist(user.wishlist, setProducts)}
                className={`${styles["clear"]} ${styles["button"]}`}
              >
                EMPTY WISHLIST
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Wishlist;

Wishlist.getInitialProps = async (ctx) => {
  try {
    const { token, email } = parseCookies(ctx);
    if (token) {
      const user = await axios.post(baseURL + "auth", { email: email });
      const { wishlist: wishlistId } = user.data;
      const wishlist = await getWishlist(wishlistId);
      return { wishlist };
    }
  } catch (err) {
    console.log(err, "error in wislist page");
    return {};
  }
};
