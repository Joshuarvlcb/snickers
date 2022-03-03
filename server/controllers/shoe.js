const Shoe = require("../models/Shoe");

const getShoes = async (req, res) => {
  /*
    start off with all the shoes 
    find all querys
    brand
    price lowest to > || highest to <
    gender
    

    filter
    return shoes
    */
  try {
    const shoes = [];
    const shoe = await Shoe.find({});
    const { brand, price, gender } = req.query;
    console.log(gender);
    if (brand) {
      shoe.forEach((obj) => {
        if (brand === obj.brand) shoes.push(obj);
      });
    }
    if (gender) {
      if (gender === "men" || gender === "women") {
        shoe.forEach((obj) => {
          if (gender == obj.gender) shoes.push(obj);
        });
      } else {
        return res.status(400).send("query does not exist");
      }
    }
    if (price) {
      if (!shoes.length) shoes = shoe.slice();
      if (price == -1) {
        shoes.sort((a, b) =>
          a.retailPrice > b.retailPrice ? 1 : a.retailPrice === b.retailPrice
        )
          ? 0
          : -1;
      }
      //   } else if (price == 1) {
      //     shoes.sort((a, b) => b.retailPrice - a.retailPrice);
      //   }
    }
    return res.status(200).json(shoes);
  } catch (err) {
    console.log(err);
    return res.status(401).send("error getting all shoes");
  }
};

const getShoe = async (req, res) => {
  const { id } = req.params;
  const shoe = await Shoe.findById(id);
  if (!shoe) return res.status(401).send("shoe does not exist");

  return res.status(200).json(shoe);
};

module.exports = { getShoes, getShoe };
