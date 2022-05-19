import React from "react";

const sneakers = () => {
  return (
    <div className="sneakers">
      <div className="filter">
        <div className="filter_model"></div>
        <div className="filter_brand"></div>
        <div className="filter_price"></div>
      </div>
      <div className="results">
        <div className="results_length">40</div>
        <div className="sort"></div>
        <div className="results_container">{/* shoe shoe shoe ... */}</div>
        <div className="pagination"></div>
      </div>
    </div>
  );
};

export default sneakers;
