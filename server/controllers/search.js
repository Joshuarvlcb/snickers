const Shoes = require("../models/Shoe");

const search = async (req, res) => {
  try {
    const { shoe } = req.body;
    const results = Shoes.find({
      name: {
        $regex: shoe,
        $options: i,
      },
    });
    res.status(200).json(results);
  } catch (err) {
    console.log(err, "error happened in search controller");
  }
};
