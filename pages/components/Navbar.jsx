import React from "react";
import styles from "../../styles/Navbar.module.scss";
import Link from "next/link";
import Search from "./Search";
const Navbar = ({ popularShoes }) => {
  return (
    <nav className={styles.navbar}>
      <Search popularShoes={popularShoes} />
      <div className={styles.logo}>logo</div>

      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href="/sneakers">Sneakers</Link>
        </li>
        <li className={styles.link}>
          <Link href="/account">Account</Link>
        </li>
        <li className={styles.link}>
          <Link href="/account">Bag</Link>
        </li>
        <li className={styles.link}>
          <Link href="/account">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
