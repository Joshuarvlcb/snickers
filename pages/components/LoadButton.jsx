import React from "react";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";
const LoadButton = () => {
  return (
    <div className={styles["center"]}>
      <button className={styles["button"]}>
        <Link href="/sneakers">SEE MORE</Link>
      </button>
    </div>
  );
};

export default LoadButton;
