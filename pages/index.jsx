import React from "react";
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
  console.log(popular.popularShoes);
  console.log(newest.newestShoes);

  /*
      lowest => greatest

      have one pointer that will compare to every value in the array 
      ??am i guarenteed to find the smallest value first iteration 
      !!YES
      after each iteration I want to start swapping on pointer index in array

      let index = 0
      while(true){
        let state = true;
        for(let [i,number] of Object.entries(arr)){
          if(i >= index){
            232 > 2
            if(arr[index] > number){
              let temp = arr[i];
              arr[index] = arr[i];
              arr[i] = temp
              state = false
            }
          }
        }
        index++
        if(state is true) break
      }
      */
  const array = [34545, 45, 3, 3232, 2, 90, 23123, 3, 1, 3, 9];
  const sort = (arr) => {
    let array = arr;
    let index = 0;
    while (index === array.length - 1) {
      for (let [i, number] of Object.entries(array)) {
        if (index >= i) {
          if (arr[index] > number) {
            let temp = array[index];
            array[index] = array[i];
            array[i] = temp;
          }
        }
      }
      index++;
    }

    console.log(arr);
  };
  sort(array);
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
