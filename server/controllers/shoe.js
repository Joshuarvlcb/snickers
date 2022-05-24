const Shoe = require("../models/Shoe");

const getShoes = async (req, res) => {
  try {
    let shoes = [];
    const shoe = await Shoe.find({});
    const { brand, low, high, model, ascending, descending, popular, newest } =
      req.query;

    console.log(ascending, descending, popular, newest, brand);

    if (brand) {
      shoe.forEach((obj) => {
        if (brand.toLowerCase() === obj.brand.toLowerCase()) shoes.push(obj);
      });
    }
    if (model) {
      shoe.forEach((obj) => {
        if (model.toLowerCase() === obj.model.toLowerCase()) shoes.push(obj);
      });
    }
    if (high || low) {
      /*
      if we have other filters
        filter the shoes array
      else 
      filter Shoe collection
      */
      if (model || brand) {
        shoes = shoes.filter((obj) => obj.price >= +low && obj.price <= +high);
        if (shoes.length == 0) return res.status(205).json({ shoes });
      } else {
        shoes = shoe.filter((obj) => {
          return obj.price >= +low && obj.price <= +high;
        });
      }
    }
    if (shoes.length === 0) shoes = shoe;
    // if (gender) {
    //   if (gender === "men" || gender === "women") {
    //     shoe.forEach((obj) => {
    //       if (gender == obj.gender) shoes.push(obj);
    //     });
    //   } else {
    //     return res.status(400).send("query does not exist");
    //   }
    // }
    /*
    sort shoes
    */
    if (ascending) {
      console.log("ascending");

      let index = 0;
      while (index <= shoes.length - 1) {
        for (let [i, obj] of Object.entries(shoes)) {
          if (index >= i) {
            if (shoes[index].price < obj.price) {
              let temp = shoes[index].price;
              shoes[index].price = obj.price;
              shoes[i].price = temp;
            }
          }
        }
        index++;
      }
    }
    if (descending) {
      console.log("decending");
      let index = 0;
      while (index <= shoes.length - 1) {
        for (let [i, obj] of Object.entries(shoes)) {
          if (index >= i) {
            if (shoes[index].price > obj.price) {
              let temp = shoes[index].price;
              shoes[index].price = obj.price;
              shoes[i].price = temp;
            }
          }
        }
        index++;
      }
    }
    if (popular) {
      /*
      create 2 arrays 
      loop 2 times 
      combine popular than newest
      */
      console.log("popular");
      const popular = shoes.filter((shoe) => shoe.popular);
      const newest = shoes.filter((shoe) => shoe.newest);
      shoes = [...popular, ...newest];
    }
    if (newest) {
      console.log("newest");
      const popular = shoes.filter((shoe) => shoe.popular);
      const newest = shoes.filter((shoe) => shoe.newest);
      shoes = [...newest, ...popular];
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
