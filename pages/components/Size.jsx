import React, { useEffect, useRef } from "react";
import styles from "../../styles/Shoe.module.scss";

const Size = ({ size, state, setSize }) => {
  return (
    <div
      onClick={() => {
        if (size === state) return setSize("");
        setSize(size);
      }}
      className={`${styles.size} ${size == state ? styles["clicked"] : ""}`}
    >
      {size}
    </div>
  );
};

export default Size;
