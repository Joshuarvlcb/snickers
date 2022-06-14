import React from "react";
import Link from "next/link";
const Shoe = ({ pic, name, brand, id }) => {
  return (
    <Link href={"/" + id}>
      <div className="shoe">
        <img className={"pic"} src={pic} alt={brand} />
        <div className="info">
          <div className="brand">{brand}</div>
          <div className="name">{name}</div>
        </div>
      </div>
    </Link>
  );
};

export default Shoe;
