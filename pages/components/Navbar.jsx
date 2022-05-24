import React from "react";
import styles from "../../styles/Navbar.module.scss";
import Link from "next/link";
import Search from "./Search";
import Cookie from "js-cookie";
import { GiConverseShoe } from "react-icons/gi";
import { MdOutlineAccountBox, MdOutlineShoppingBag } from "react-icons/md";
import { BiBookHeart } from "react-icons/bi";
// MdAccountBox
//BsBookmarkHeart
//MdOutlineShoppingBag
//GiConverseShoe
const Navbar = ({ popularShoes }) => {
  return (
    <nav className={styles.navbar}>
      <Search popularShoes={popularShoes} />
      <div className={styles.logo}>logo</div>

      <ul className={styles.links}>
        {/* <li className={styles.link}>
          <Link href="/sneakers">
            <GiConverseShoe className={styles.link} />
          </Link>
        </li> */}
        <li className={styles.link}>
          <div className={styles["dropdown"]}>
            <MdOutlineAccountBox className={styles.link} />
            <div className={styles["dropdown-content"]}>
              <Link href="/wishlist">
                <a>Wishlist</a>
              </Link>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
              <Link href={Cookie.get("token") ? "/login" : "/signup"}>
                <a
                  onClick={() => {
                    if (!Cookie.get("token")) return;
                    Cookie.remove("token");
                  }}
                >
                  {Cookie.get("token") ? "Sign out" : "Sign in"}
                </a>
              </Link>
            </div>
          </div>
        </li>
        <li className={styles.link}>
          <Link href="/wishlist">
            <BiBookHeart className={styles.link} />
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/cart">
            <MdOutlineShoppingBag className={styles.link} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
