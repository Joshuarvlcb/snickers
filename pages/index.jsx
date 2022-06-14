import React, { useEffect } from "react";
import { logoutUser } from "./util/auth";
import Head from "next/head";
import Image from "next/image";
import Shoe from "./components/Shoe";
import LoadButton from "./components/LoadButton";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import styles from "../styles/Home.module.scss";

function Home({ popular, newest }) {
  return (
    <div className={styles["home"]}>
      <Landing />
      <div className={styles["shoe-section"]}>
        <h1 className={styles["title"]}>Popular</h1>
        <div className={styles["shoe_container"]}>
          {popular.popularShoes.slice(0, 8).map((shoe) => {
            return (
              <Shoe
                name={shoe.name}
                brand={shoe.brand}
                id={shoe._id}
                pic={shoe.pic}
              />
            );
          })}
        </div>
        <LoadButton />
      </div>
      <div className={`${styles["shoe-section"]} ${styles["margin-bottom"]}`}>
        <h1 className={styles["title"]}>Newest</h1>
        <div className={styles["shoe_container"]}>
          {newest.newestShoes.slice(0, 8).map((shoe) => {
            return <Shoe name={shoe.name} brand={shoe.brand} pic={shoe.pic} />;
          })}
        </div>
        <LoadButton />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
