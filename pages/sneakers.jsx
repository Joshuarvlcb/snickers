import React,{useState,useEffect} from "react";

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
   const [filter, setFilter] = useState({brand:false,model:false,price:{high:false,low:false}})
   const [sort, setSort] = useState({ascending:false,decending:false,popular:false,newest:false});
   const [results, setResults] = useState([]);
   const [pagination, setPagination] = useState(0)
   useEffect(() => {

   },[sort,filter]);

   useEffect(() => {

   },[pagination]);

  return (
    <div className="sneakers">
      {/* <button>clear filters</button> */}
      <div className="filter">
          <input type="checkbox" name="brand" id=""/>
          <label htmlFor="brand">brand</label>
          <input type="checkbox" name="model" id=""/>
          <label htmlFor="model">model</label>
          <div className="price">
            <input type="text" placeholder = 'low'/>
            <input type="text" placeholder = 'high'/>
          </div>
        </div>
    
      <div className="results">
        <div className="results_length">40</div>
        <div className="sort">
          <select name="sort" id="">
            <option value="ascending">ascending</option>
            <option value="decending">decending</option>
            <option value="popular"></option>
            <option value="newest"></option>
          </select>
        </div>
        <div className="results_container">{/* shoe shoe shoe ... */}</div>
        <div className="pagination"></div>
      </div>
      </div>
  );
};

export default sneakers;
