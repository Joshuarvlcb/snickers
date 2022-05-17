import React from "react";
import { logoutUser } from "./util/auth";
import Head from "next/head";
import Image from "next/image";
import Shoe from "./components/Shoe";
import Navbar from "./components/Navbar";
import LoadButton from "./components/LoadButton";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import axios from "axios";
import { baseURL } from "./util/auth";
function Home({ popular }) {
  return (
    <div>
      <Navbar popularShoes={popular.popularShoes} />
      <Landing />
      <h1>popular</h1>
      <Shoe />
      <LoadButton />
      <h1>newest</h1>
      <LoadButton />
      <Shoe />
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
    return { popular: results.data };
  } catch (err) {
    console.log(err, "error in search component");
    return {};
  }
};
export default Home;
