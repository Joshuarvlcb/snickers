import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, popularShoes }) => {
  return (
    <>
      <Navbar popularShoes={popularShoes} />
      {children}
    </>
  );
};

export default Layout;
