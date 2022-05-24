import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
const Shoe = ({ pic, name, brand, id }) => {
  return (
    <div onClick={() => {}} className={styles.shoe}>
      <Link href={"/" + id}>
        <img className={styles["pic"]} src={pic} alt={brand} />
      </Link>
      <div className={styles["info"]}>
        <div className={styles["brand"]}>{brand}</div>
        <div className={styles["name"]}>{name}</div>
      </div>
    </div>
  );
};

export default Shoe;
