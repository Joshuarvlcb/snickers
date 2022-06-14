import React from "react";
import Link from "next/link";
const Shoe = ({ pic, name, brand, id }) => {
  return (
    <div onClick={() => {}} className="shoe">
      <Link href={"/" + id}>
        <img className={"pic"} src={pic} alt={brand} />
      </Link>
      <div className="info">
        <div className="brand">{brand}</div>
        <div className="name">{name}</div>
      </div>
    </div>
  );
};

export default Shoe;
