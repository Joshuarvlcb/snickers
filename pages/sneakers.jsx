import React, { useState, useEffect, useRef } from "react";
import { getShoes } from "./util/shoeActions";
import Shoe from "./components/Shoe";
import styles from "../styles/Sneakers.module.scss";
const sneakers = () => {
  /*
    state for filters 
    state for sorts
    state for results
    state for pagination

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

    elements
    filter will be checkboxes

    sort will be dropdown


    pagination
    10 per page
    
    pages = Math.floor(10/results)

    Shoe when you click on shoe you route to shoe name

    when you click on buy now route to payment page
    use stripe
    send email

    */
  let high = useRef();
  let low = useRef();
  const [filter, setFilter] = useState({
    brand: {
      adidas: false,
      airJordan: false,
      nike: false,
    },
    model: false,
    price: { high: false, low: false },
  });
  const [sort, setSort] = useState({
    ascending: false,
    descending: false,
    popular: false,
    newest: false,
  });
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    console.log(filter);
    console.log(sort);
    /*
    set results
    
    calculate results
    use slice page - 10
    start end

    array.slice(page * 10,page +1 * 10)

    calculate pages 
    return no more than 10 shoes

    
    */
    const updateShoes = async () => {
      const results = await getShoes(filter, sort);
      setResults(results.slice(page * 10, (page + 1) * 10));
      //calc page
      setPages(Math.ceil(results.length / 10));
    };
    updateShoes();
  }, [sort, filter, page]);
  /*


*/
  return (
    <div className="sneakers">
      {/* <button>clear filters</button> */}
      <div className="filter">
        <h3>brand</h3>
        <input
          type="checkbox"
          name="addidas"
          id=""
          onClick={(e) => {
            setFilter({
              ...filter,
              brand: { ...filter.brand, adidas: e.target.checked },
            });
          }}
        />
        <label htmlFor="brand">addidas</label>
        <input
          type="checkbox"
          name="AirJordan"
          id=""
          onClick={(e) => {
            setFilter({
              ...filter,
              brand: { ...filter.brand, airJordan: e.target.checked },
            });
          }}
        />
        <label htmlFor="brand">air jordan</label>
        <input
          type="checkbox"
          name="model"
          id=""
          onClick={(e) => {
            setFilter({ ...filter, model: e.target.checked });
          }}
        />
        <label htmlFor="model">model</label>
        <div className="price">
          <input
            type="number"
            placeholder="low"
            ref={(value) => (low = value)}
          />
          <input
            type="number"
            placeholder="high"
            ref={(value) => (high = value)}
          />

          <button
            onClick={(e) => {
              console.log(+high.value, +low.value);
              if (!low.value || !high.value) return;
              setFilter({
                ...filter,
                price: { high: +high.value, low: +low.value },
              });
            }}
          >
            apply
          </button>
        </div>
      </div>

      <div className="results">
        <div className={styles["results_container"]}>
          {results?.map((shoe) => {
            return <Shoe id={shoe._id} pic={shoe.pic} />;
          })}
        </div>
        <div className="results_length">40</div>
        <div className="sort">
          <select
            name="sort"
            onChange={(e) => {
              if (e.target.value == "e.target.value") return;
              console.log(e.target.value);
              const value = e.target.value;
              //get the whole object loop over it to create new object update state
              const obj = {};
              for (let key in sort) {
                //if current === value set true else false
                if (key === value) {
                  obj[key] = true;
                } else obj[key] = false;
              }
              setSort(obj);
            }}
          >
            <option value="relevance">relevance</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
            <option value="popular">popular</option>
            <option value="newest">newest</option>
          </select>
        </div>
        <div className="results_container">{/* shoe shoe shoe ... */}</div>
        <div className="pagination">
          <div
            className=""
            onClick={() => {
              if (page <= 0) return;
              setPage((pre) => {
                return pre - 1;
              });
            }}
          >
            back
          </div>
          <div className="pages">
            {page + 1} from {pages}
          </div>
          <div
            className="forward"
            onClick={() => {
              if (page + 1 >= pages) return;
              setPage((pre) => {
                return pre + 1;
              });
            }}
          >
            forward
          </div>
        </div>
      </div>
    </div>
  );
};

export default sneakers;
