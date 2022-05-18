const { contentType } = require("express/lib/response");
const Shoes = require("../models/Shoe");

const search = async (req, res) => {
  try {
    const { shoe } = req.body;
    console.log(shoe, "server");
    const results = await Shoes.find({
      name: { $regex: shoe, $options: "i" },
    });
    res.status(200).json({ results, length: results.length });
  } catch (err) {
    console.log(err, "error happened in search controller");
    res.status(403).send("error");
  }
};
const getRidOfQuotes = async (req, res) => {
  let copy = [];

  res.status(200).json({ copy, length: copy.length });
};
module.exports = { search, getRidOfQuotes };
