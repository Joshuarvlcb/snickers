const Shoe = require("../models/Shoe");

/*
filter and sort with getShoes
state that keeps track of all querys

pass in all querys in clientSide in request


*/

const getShoes = async (req, res) => {
  /*
  filter
    model
    brand
    price

  sort
    low to high
    high to low
    newest > popular
    popular > newest

    front end
    state for filter objects
    state for sort objects

    useEffect(() => {
        getResults(axios.get('/shoes?querys))
    },[results])

    pagination
    10 per page
    
    pages = Math.floor(10/results)

    Shoe when you click on shoe you route to shoe name

    when you click on buy now route to payment page
    use stripe
    send email

    */
  try {
    let shoes = [];
    const shoe = await Shoe.find({});
    const { brand, price, model, ascending, descending, popular, newest } =
      req.query;
    if (brand) {
      shoe.forEach((obj) => {
        if (brand === obj.brand) shoes.push(obj);
      });
    }
    if (model) {
      shoe.forEach((obj) => {
        if (model === obj.model) shoes.push(obj);
      });
    }
    if (price) {
      /*
      if we have other filters
        filter the shoes array
      else 
      filter Shoe collection
      */
      if (shoe.length === 0) {
        for (let sneaker of shoe) {
          if (sneaker.price >= price.low && sneaker.price <= price.high)
            shoes.push(sneaker);
        }
      } else {
        for (let sneaker of shoes) {
          if (sneaker.price >= price.low && sneaker.price <= price.high)
            shoes.push(sneaker);
        }
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
      while (index === array.length - 1) {
        for (let [i, number] of Object.entries(array)) {
          if (index >= i) {
            if (arr[index] > number) {
              let temp = array[index];
              array[index] = array[i];
              array[i] = temp;
            }
          }
        }
        index++;
      }
    }
    if (descending) {
      let array = arr;
      let index = 0;
      while (index === array.length - 1) {
        for (let [i, number] of Object.entries(array)) {
          if (index >= i) {
            if (arr[index] < number) {
              let temp = array[index];
              array[index] = array[i];
              array[i] = temp;
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
      shoes = [...popular, newest];
    }
    if (newest) {
      const popular = shoes.filter((shoe) => shoe.popular);
      const newest = shoes.filter((shoe) => shoe.newest);
      shoes = [...newest, popular];
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
