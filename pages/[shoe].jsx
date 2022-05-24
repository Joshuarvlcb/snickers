import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseURL } from "./util/auth";
import styles from "../styles/Shoe.module.scss";
import { FiHeart } from "react-icons/fi";
import Size from "./components/Size";
const Shoe = ({ shoe }) => {
  const shoeSizes = [
    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
  ];

  /*
when i click size i want to add clicked className of the size i clicked on
state that keeps track of which size i clicked on

compare size value with state
*/
  const [sizeValue, setSize] = useState("");
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
          {shoeSizes.map((size) => {
            /*
            remove and add clicked class
            
            to remove
            how to check if element has clicked class

            to add
            */
            return <Size size={size} state={sizeValue} setSize={setSize} />;
          })}
        </div>
        <div className={styles["button-container"]}>
          <button className={styles["cart-button"]}>ADD TO BAG</button>
          <button className={styles["heart-button"]}>
            FAVORITE <FiHeart className={styles.heart} />
          </button>
        </div>
      </div>
    </div>
  );
};

Shoe.getInitialProps = async (ctx) => {
  try {
    const { shoe: id } = ctx.query;
    const shoe = await axios.get(`${baseURL}shoes/${id}`);
    return { shoe: shoe.data };
  } catch (err) {
    console.log(err, "error in shoe page");
    return { error: "error" };
  }
};

export default Shoe;
