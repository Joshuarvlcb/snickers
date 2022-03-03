const Shoe = require("../models/Shoe");
//model
const shoes = require("../../shoes.json");

const populate = () => {
  //delete
  try {
    Shoe.deleteMany({});
    Shoe.create(shoes);
  } catch (err) {
    console.log(err);
  }
  //create
};

module.exports = populate;
