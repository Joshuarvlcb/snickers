import React from "react";
import styles from "../../styles/Home.module.scss";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["icons"]}>
        <div className={styles["circle"]}>
          <BsInstagram className={styles["icon"]} />
        </div>
        <div className={styles["circle"]}>
          <BsFacebook className={styles["icon"]} />
        </div>
        <div className={styles["circle"]}>
          <BsTwitter className={styles["icon"]} />
        </div>
      </div>
      <div className={styles["copy-right"]}>@ 2022 sneakerz.com</div>
    </div>
  );
};

export default Footer;
