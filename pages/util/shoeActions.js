import axios from "axios";
import { baseURL } from "./auth";
export const getShoes = async (
  { brand, model, price: { low, high } },
  { popular, ascending, descending, newest }
) => {
  console.log(brand, model, high, low, popular, ascending, descending, newest);
  try {
    let string = "?";
    /*
!!make brand querys && model querys

*/
    const querys = [model, high, low, popular, ascending, descending, newest]
      .filter((query) => {
        if (query) return query;
      })
      .map((query) => {
        if (query === model) {
          return "model";
        }
        if (query === high) {
          return "high";
        }
        if (query === low) {
          return "low";
        }
        if (query === popular) {
          return "popular";
        }
        if (query === ascending) {
          return "ascending";
        }
        if (query === descending) {
          return "descending";
        }
        if (query === newest) {
          return "newest";
        }
        return query;
      });
    for (let key in brand) {
      if (brand[key]) querys.push("brand");
    }
    console.log(querys);
    [
      `model=${model}&`,
      `high=${high}&`,
      `low=${low}&`,
      `popular=${popular}&`,
      `ascending=${ascending}&`,
      `descending=${descending}&`,
      `newest=${newest}&`,
    ].forEach((param, i) => {
      console.log(param.split("=")[0]);

      if (querys.find((q) => q === param.split("=")[0])) {
        string += param;
      }
    });
    /*
    add my brands at the end
    if querys includes brands
    loop over brand value
    add param string if brand value is true
    */
    if (querys.includes("brand")) {
      for (let key in brand) {
        let b;
        if (brand[key]) {
          b = key;
          string += `brand=${b}&`;
        }
      }
    }

    console.log(string);
    const results = await axios.get(`${baseURL}shoes${string}`);
    console.log(results.data);
    return results.data;
  } catch (err) {
    console.log(err, "error in getting shoes");
  }
};
