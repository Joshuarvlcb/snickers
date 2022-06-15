import React, { useState } from "react";
import { baseURL } from "./util/auth";
import { getCart, deleteProduct, deleteCart } from "./util/cartActions";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import styles from "../styles/Cart.module.scss";
import Shoe from "./components/Shoe";
/*
make a request to server to get cart
state for cart

map over cart if length > 0
if not return nothing in cart 

actions for product
delete or add more quantity

actions for page
calculate total 
delete all items from cart
checkout button 

*/

const Cart = ({ cart, user }) => {
  const [products, setProducts] = useState(cart);
  /*
  <button
                  className={styles["button"]}
                  onClick={async () => {
                    /*
                    ??How can I rerender when I delete a product
                    
                    
                    */
  //     deleteProduct(
  //       user.cart,
  //       obj.product._id,
  //       null,
  //       setProducts
  //     );
  //   }}
  // >
  //   delete
  // </button>

  return (
    <div className={styles["cart"]}>
      <h1 className={styles["title"]}>SHOPPING CART</h1>
      <div className={styles["cart-container"]}>
        {products.length >= 1 ? (
          products.map((shoe, i) => {
            return (
              <div className={styles["product"]} key={i}>
                <Shoe
                  id={shoe.product._id}
                  pic={shoe.product.pic}
                  brand={shoe.product.brand}
                  name={shoe.product.name}
                  delete={true}
                />
                <div
                  className={styles["delete-button"]}
                  onClick={() => {
                    deleteProduct(
                      user.cart,
                      shoe.product._id,
                      null,
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
                return acc + shoe.product.price;
              }, 0)}
              .00
            </div>
            <div className={styles["checkout"]}>
              <Link href="/payment">
                <button className={`${styles["payment"]} ${styles["button"]}`}>
                  CHECKOUT
                </button>
              </Link>
              <button
                onClick={() => {
                  deleteCart(user.cart, setProducts);
                }}
                className={`${styles["clear"]} ${styles["button"]}`}
              >
                EMPTY CART
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

export default Cart;

Cart.getInitialProps = async (ctx, component) => {
  try {
    const { token, email } = parseCookies(ctx);
    if (token) {
      const user = await axios.post(baseURL + "auth", { email: email });
      const { cart } = user.data;
      const CART = await getCart(cart);
      return { cart: CART };
    }
    return {};
  } catch (err) {
    console.log(err);
    return { err };
  }
};
