import React, { useState, useEffect, useRef } from "react";
import { getShoes } from "../util/shoeActions";
import Shoe from "./components/Shoe";
import styles from "../styles/Sneakers.module.scss";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
const Sneakers = () => {
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
      "Air Jordan": false,
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
  const [brand, setBrand] = useState(false);
  const [price, setPrice] = useState(false);
  useEffect(() => {
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
      if (results.length <= 0) {
        setResults([]);
        setPages(0);
        return;
      }
      setResults(results.slice(page * 10, (page + 1) * 10));
      //calc page
      setPages(Math.ceil(results.length / 10));
    };
    updateShoes();
  }, [sort, filter, page]);

  return (
    <div className={styles["sneakers"]}>
      {/* <button>clear filters</button> */}
      <div className="filter-container">
        <p className={styles["p"]}>FILTER</p>
        <div className={styles["filter"]}>
          <div className={styles["filter-title"]}>
            <h4>BRAND</h4>
            {!brand ? (
              <RiArrowDropDownLine
                className={styles["dropdown"]}
                onClick={() => setBrand(true)}
              />
            ) : (
              <RiArrowDropUpLine
                className={styles["dropdown"]}
                onClick={() => setBrand(false)}
              />
            )}
          </div>
          {brand && (
            <div className={styles["options"]}>
              <div className={styles["option"]}>
                <input
                  className={styles["input"]}
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
                <label className={styles["label"]} htmlFor="brand">
                  Addidas
                </label>
              </div>
              <div className={styles["option"]}>
                <input
                  type="checkbox"
                  name="AirJordan"
                  className={styles["input"]}
                  id=""
                  onClick={(e) => {
                    setFilter({
                      ...filter,
                      brand: {
                        ...filter.brand,
                        "Air Jordan": e.target.checked,
                      },
                    });
                  }}
                />
                <label className={styles["label"]} htmlFor="brand">
                  Air Jordan
                </label>
              </div>
            </div>
          )}
        </div>
        <div className={styles["filter"]}>
          <div className={styles["filter-title"]}>
            <h4>PRICE</h4>
            {!price ? (
              <RiArrowDropDownLine
                className={styles["dropdown"]}
                onClick={() => setPrice(true)}
              />
            ) : (
              <RiArrowDropUpLine
                className={styles["dropdown"]}
                onClick={() => setPrice(false)}
              />
            )}
          </div>
          {price && (
            <div className={styles["options"]}>
              <input
                className={styles["price"]}
                type="number"
                placeholder="Low"
                ref={(value) => (low = value)}
              />
              <input
                className={styles["price"]}
                type="number"
                placeholder="High"
                ref={(value) => (high = value)}
              />

              <button
                className={styles["button"]}
                onClick={(e) => {
                  if (!low.value || !high.value) return;
                  setFilter({
                    ...filter,
                    price: { high: +high.value, low: +low.value },
                  });
                }}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles["results"]}>
        <div className={styles["title"]}>
          <div className={styles["p"]}>Results : {results?.length}</div>
          <div className={styles["sort"]}>
            <p className={styles["sort-p"]}>Sort by : </p>
            <select
              className={`${styles["select"]} ${styles["padding"]}`}
              name="sort"
              onChange={(e) => {
                if (e.target.value == "e.target.value") return;
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
              <option value="relevance">Relevance</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        {results.length <= 0 ? (
          <h1>No Results</h1>
        ) : (
          <>
            <div className={styles["results_container"]}>
              {results?.map((shoe, i) => {
                return (
                  <Shoe
                    key={i}
                    id={shoe._id}
                    pic={shoe.pic}
                    brand={shoe.brand}
                    name={shoe.name}
                  />
                );
              })}
            </div>
            <div className={styles["pagination"]}>
              <IoChevronBackSharp
                className={styles["page-icon"]}
                onClick={() => {
                  if (page <= 0) return;
                  setPage((pre) => {
                    return pre - 1;
                  });
                }}
              />

              <div className="pages">
                {page + 1} from {pages}
              </div>
              <IoChevronForwardSharp
                className={styles["page-icon"]}
                onClick={() => {
                  if (page + 1 >= pages) return;
                  setPage((pre) => {
                    return pre + 1;
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sneakers;
