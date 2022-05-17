import React from "react";
import styles from "../../styles/Navbar.module.scss";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <input type="text" style={styles.search} />
      <div className={styles.logo}>logo</div>

      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href="/sneaker">Sneakers</Link>
        </li>
        <li className={styles.link}>
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
