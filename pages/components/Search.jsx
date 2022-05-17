import React, { useState, useEffect } from "react";
import styles from "../../styles/Navbar.module.scss";

// import { baseURL } from "../util/auth";
// import axios from "axios";
const Search = ({ popularShoes }) => {
  const [showModal, setShowModal] = useState(false);
  const [shoe, setShoe] = useState("");
  const [shoes, setShoes] = useState([]);
  /*
        jsx 
        input
        shoe modal

        create a state that will show shoe modal when you click on the input
        shoe modal will be removed clicked outside of it or the close button

        use axios canceler 
        create regex shoe controller 
    */
  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        onChange={(e) => {
          setShoe(e.target.value);
          //make request to api
          //use canceler
        }}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <>
          <div className={styles.modal}>
            <div className={styles["shoes_container"]}>
              {shoe === ""
                ? popularShoes.map((shoe) => {
                    return (
                      <div className={styles.shoe}>
                        <img
                          src={shoe.pic}
                          alt=""
                          className={styles["shoe_picture"]}
                        />
                        <div className={styles["shoe_name"]}>{shoe.name}</div>
                      </div>
                    );
                  })
                : shoe}
              {/* if input value is not empty call regex shoe route */}
              {/* map through shoes  */}
            </div>
            <div className={styles.close} onClick={() => setShowModal(false)}>
              close
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;