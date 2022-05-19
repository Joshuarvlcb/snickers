import React,{useEffect} from "react";
import { logoutUser } from "./util/auth";
import Head from "next/head";
import Image from "next/image";
import Shoe from "./components/Shoe";
import Navbar from "./components/Navbar";
import LoadButton from "./components/LoadButton";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import styles from "../styles/Home.module.scss";
import { parseCookies } from "nookies";
import axios from "axios";
import { baseURL } from "./util/auth";
function Home({ popular, newest }) {
  // console.log(popular.popularShoes);
  // console.log(newest.newestShoes);
  useEffect(() => {
    const getShoes = async () => {
      // { brand, price, model, ascending, descending, popular, newest } 
      /*
      price object
      
      regex

      brand
      model
      */
      const results = await axios.get(`${baseURL}shoes?brand=${"Adidas"}&low=${400}&high=${800}&ascending=${true}&popular=${true}`)
      console.log(results)
    }
    getShoes()
  },[])
  
  return (
    <div>
      <Navbar popularShoes={popular.popularShoes} />
      <Landing />
      <h1>popular</h1>
      <div className={styles["shoe_container"]}>
        {popular.popularShoes.slice(0, 8).map((shoe) => {
          return <Shoe name={shoe.name} brand={shoe.brand} pic={shoe.pic} />;
        })}
      </div>
      <LoadButton />
      <h1>newest</h1>
      <div className={styles["shoe_container"]}>
        {newest.newestShoes.slice(0, 8).map((shoe) => {
          return <Shoe name={shoe.name} brand={shoe.brand} pic={shoe.pic} />;
        })}
      </div>
      <LoadButton />
      <Footer />
      <button
        onClick={(e) => {
          logoutUser("joshua1@gmail.com");
        }}
      >
        logout
      </button>
    </div>
  );
}

Home.getInitialProps = async (ctx, component) => {
  try {
    const { token } = parseCookies(ctx);
    const results = await axios.get(
      baseURL + "shoes/popular",
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const newest = await axios.get(
      baseURL + "shoes/newest",
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return { popular: results.data, newest: newest.data };
  } catch (err) {
    console.log(err, "error in search component");
    return {};
  }
};
export default Home;
