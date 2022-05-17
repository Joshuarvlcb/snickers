import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Shoe from "./components/Shoe";
import Navbar from "./components/Navbar";
import LoadButton from "./components/LoadButton";
import Footer from "./components/Footer";
import Landing from "./components/Landing";

/*

*/

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <h1>popular</h1>
      <Shoe />
      <LoadButton />
      <h1>newest</h1>
      <LoadButton />
      <Shoe />
      <Footer />
    </>
  );
}
