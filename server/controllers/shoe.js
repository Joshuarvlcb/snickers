const Shoe = require("../models/Shoe");


const getShoes = async (req, res) => {

  try {
    let shoes = [];
    const shoe = await Shoe.find({});
    const { brand, low,high, model, ascending, descending, popular, newest } =
      req.query;
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
    if(shoes.length >= 0){
      shoes = shoes.filter((obj) => obj.price >= low && obj.price <= high)
    }else{
      shoes = shoe.filter((obj) => obj.price >= low && obj.price <= high)
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
      /*
      lowest => greatest

      have one pointer that will compare to every value in the array 
      ??am i guarenteed to find the smallest value first iteration 
      !!YES
      after each iteration I want to start swapping on pointer index in array

      let index = 0
      while(true){
        let state = true;
        for(let [i,number] of Object.entries(arr)){
          if(i >= index){
            232 > 2
            if(arr[index] > number){
              let temp = arr[i];
              arr[index] = arr[i];
              arr[i] = temp
              state = false
            }
          }
        }
        index++
        if(state is false) break
      }
      */
      let index = 0;
      while (index <= shoes.length - 1) {
        for (let [i, obj] of Object.entries(shoes)) {
          if (index >= i) {
            if (shoes[index].price < obj.price) {

              /*
              2 < 50

              */
              let temp = shoes[index].price;
              //2
              shoes[index].price = obj.price;
              //i = 50
              shoes[i].price = temp;
              //j = 2
              /*
              [2,67,50]
              temp = 2
              i = 50
              j = 2

              [2,50]

              
              */
            }
          }
        }
        index++;
      }
    }
    if (descending) {
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
      const popular = shoes.filter((shoe) => shoe.popular);
      const newest = shoes.filter((shoe) => shoe.newest);
      shoes = [...popular, ...newest];
    }
    if (newest) {
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
