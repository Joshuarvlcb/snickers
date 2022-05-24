import React, { useState, useEffect } from "react";
import styles from "../../styles/Navbar.module.scss";
import axios from "axios";
import { baseURL } from "../util/auth";
import { ImSearch } from "react-icons/im";
import { AiOutlineCloseSquare } from "react-icons/ai";

// import { baseURL } from "../util/auth";
// import axios from "axios";
const Search = ({ popularShoes }) => {
  const [showModal, setShowModal] = useState(false);
  const [shoe, setShoe] = useState("");
  const [shoes, setShoes] = useState([]);
  let cancel;
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
  const getShoes = async (value) => {
    try {
      //!!
      cancel && cancel();
      const cancelToken = axios.CancelToken;
      const results = await axios.post(baseURL + "search", {
        shoe: value,
        cancelToken: new cancelToken((canceler) => (cancel = canceler)),
      });
      setShoes(results.data.results);
    } catch (err) {
      console.log(err, "error getting shoes");
    }
  };
  return (
    <div className={styles.search}>
      <div className={styles["input-container"]}>
        <input
          placeholder="Search"
          className={`${styles["input"]} ${
            showModal ? styles["remove-border"] : ""
          }`}
          type="text"
          onChange={(e) => {
            setShoe(e.target.value);
            getShoes(e.target.value);
            //make request to api
            //use canceler
          }}
          onClick={() => {
            setShowModal(true);
            document.body.style.setProperty("overflow", "hidden");
          }}
        />
        <ImSearch className={styles["search"]} />
        {showModal && (
          <>
            <AiOutlineCloseSquare
              className={styles.close}
              onClick={() => {
                setShowModal(false);
                document.body.style.setProperty("overflow", "scroll");
              }}
            />
          </>
        )}
      </div>
      {showModal && (
        <>
          <div className={styles["border"]}></div>
          <div className={styles.modal}>
            <h3 className={styles["title"]}>Top Results</h3>
            <div className={styles["shoes_container"]}>
              {shoe === "" ? (
                popularShoes.map((shoe) => {
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
              ) : shoe !== "" && shoes.length > 0 ? (
                shoes.map((shoe) => {
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
              ) : (
                <>no results</>
              )}
              {/* if input value is not empty call regex shoe route */}
              {/* map through shoes  */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
