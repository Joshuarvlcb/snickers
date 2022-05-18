import React from "react";

const Shoe = ({ pic, name, brand }) => {
  return (
    <div onClick={() => {}}>
      <img height="100px" src={pic} alt={brand} />
    </div>
  );
};

export default Shoe;
