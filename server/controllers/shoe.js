const Shoe = require("../models/Shoe");

const getShoes = async (req, res) => {
  try {
    let shoes = [];
    const shoe = await Shoe.find({});
    const { brand, price, gender } = req.query;
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
    if (shoes.length === 0) shoes = shoe;
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

const popular = async (req, res) => {
  try {
    const shoes = await Shoe.find({ popular: true });
    return res.status(200).json({ popularShoes: shoes });
  } catch (err) {
    console.log(err);
    return res.status(500).send("error @ popular");
  }
};
const newest = async (req, res) => {
  try {
    const shoes = await Shoe.find({ newest: true });
    return res.status(200).json({ newestShoes: shoes });
  } catch (err) {
    console.log(err);
    return res.status(500).send("error @ newest");
  }
};

module.exports = { getShoes, getShoe, newest, popular };
