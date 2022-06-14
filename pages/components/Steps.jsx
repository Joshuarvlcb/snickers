import React, { useState, useRef } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Form from "./Form";
import styles from "../../styles/Payment.module.scss";
import Cookie from "js-cookie";
import {
  AiOutlineCheckSquare,
  AiOutlineEdit,
  AiOutlineLock,
} from "react-icons/ai";
import { RiCheckboxBlankLine } from "react-icons/ri";

const Steps = ({ name, setData, data, step, setStep, email }) => {
  const stripeAuth = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const countries = [
    "",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const cardNumber = "4242 4242 4242 4242";
  const expiration = "12/34";

  /*
  dataSetState gets passed in 
  refs are how we get the data 


    states
    finished if finsihed display checkbox and edit close model
    

     1.3 conditionals to return different steps jsx
     2.toogle steps with finshed state
     3.get data from form and update data with setState


     do one step at a time steps ahead of current will be closed

     state for current step 
     update state when user continues

     state <= 0
    show
    0
    state <= 0 show
    state<= 1 dont show
    state<= 2 dont show


  1

     render whole component of state if state <= step 0 1, 2

    */
  /*
   !!stripe
   
   authenticate stripe so i can use elements using loadStripe
   create stripe jsx wrap eveything inside elements component pass prop stripe with stripe value
  
    create checkout form jsx

    create checkout form logic
    get card
    create token using card

    if(token is true) then make post request to my server pass in payment data and price


   */
  let account = useRef();
  const [shipping, setShipping] = useState({
    name: "",
    streetAddress: "",
    apartment: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [finsihed, setFinsihed] = useState(false);
  if (finsihed) {
    return (
      <>
        <div className={styles["step"]}>
          <div className={styles["name"]}>{name.toUpperCase()}</div>
          <div className={styles["icons"]}>
            {data.account.user !== "" && name == "account" ? (
              ""
            ) : (
              <AiOutlineEdit
                className={styles["edit"]}
                onClick={() => setFinsihed(false)}
              />
            )}
            <AiOutlineCheckSquare className={styles["check"]} />
          </div>
        </div>
      </>
    );
  }
  const isAccount = () => {
    setFinsihed(true),
      setData({
        ...data,
        account: { user: email },
      }),
      setStep(step + 1);
  };
  return (
    <>
      {/* conditional rendering */}
      {name === "account" ? (
        <>
          {/* if user is signed in return setFinsihed(true) */}
          {step >= 0 ? (
            <div className={styles["step"]}>
              {Cookie.get("token") ? (
                isAccount()
              ) : (
                <>
                  <form
                    action="#"
                    className={styles["form"]}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      //update data state
                      //login
                      const loggingUser = await axios.post(
                        "http://localhost:3000/api/v1/auth/login",
                        {
                          email: e.target[0].value,
                          password: e.target[1].value,
                        }
                      );
                      if (!loggingUser) return;
                      Cookie.set("token", loggingUser.token);
                      Cookie.set("email", e.target[0].value);

                      setData({
                        ...data,
                        account: { user: e.target[0].value },
                      });
                      setFinsihed(true);
                      setStep(step + 1);
                    }}
                  >
                    <div className={styles["title"]}>Account</div>

                    <div className={styles["sub-title"]}>
                      check out with account
                    </div>
                    <input
                      className={styles["input"]}
                      required={true}
                      type="text"
                      placeholder="email"
                    />
                    <input
                      className={styles["input"]}
                      required={true}
                      type="password"
                      placeholder="password"
                    />
                    <button className={styles["button"]} value="submit">
                      Continue
                    </button>
                    <div
                      className={styles["sub-title-margin"]}
                    >
                      check out as guest
                    </div>
                    <button
                      className={styles["button"]}
                      onClick={() => {
                        setFinsihed(true);

                        setStep(step + 1);
                        setData({
                          ...data,
                          account: { user: "guest" },
                        });
                      }}
                    >
                      Guest checkout
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            <div className={styles["step"]}>
              <div className={styles["locked"]}>
                <AiOutlineLock className={styles["lock"]} />
                <div className={styles["name"]}>{name.toUpperCase()}</div>
              </div>
              <RiCheckboxBlankLine className={styles["box"]} />
            </div>
          )}
        </>
      ) : name === "shipping address" ? (
        <>
          {step >= 1 ? (
            <div className={styles["step"]}>
              <form
                action="#"
                className={styles["form"]}
                onSubmit={(e) => {
                  e.preventDefault();

                  setFinsihed(true);
                  setData({ ...data, shippingData: { ...shipping } });
                  setStep(step + 1);
                }}
              >
                <div className={styles["title"]}>Shipping address</div>
                {account === "guest" ? <input type="text" /> : ""}
                {/* value = cookie || inputState */}
                <input
                  className={styles["input"]}
                  required={true}
                  type="text"
                  placeholder="full name"
                  value={shipping.name}
                  onChange={(e) => {
                    setShipping({ ...shipping, name: e.target.value });
                  }}
                />
                <input
                  className={styles["input"]}
                  required={true}
                  type="text"
                  placeholder="street address"
                  value={shipping.streetAddress}
                  onChange={(e) => {
                    setShipping({ ...shipping, streetAddress: e.target.value });
                  }}
                />
                <input
                  className={styles["input"]}
                  type="text"
                  placeholder="apartment"
                  value={shipping.apartment}
                  onChange={(e) => {
                    setShipping({ ...shipping, apartment: e.target.value });
                  }}
                />
                <input
                  className={styles["input"]}
                  required={true}
                  type="text"
                  placeholder="city"
                  value={shipping.city}
                  onChange={(e) => {
                    setShipping({ ...shipping, city: e.target.value });
                  }}
                />
                <input
                  className={styles["input"]}
                  required={true}
                  type="text"
                  placeholder="zip code"
                  value={shipping.zip}
                  onChange={(e) => {
                    setShipping({ ...shipping, zip: e.target.value });
                  }}
                />
                <select
                  className={`${styles["input"]} ${styles["padding"]}`}
                  value={shipping.country}
                  required={true}
                  onChange={(e) => {
                    setShipping({ ...shipping, country: e.target.value });
                  }}
                >
                  {/* countrys */}
                  {countries.map((name) => {
                    return <option value={name}>{name}</option>;
                  })}
                </select>
                <input
                  required={true}
                  type="text"
                  className={styles["input"]}
                  placeholder="phone number"
                  value={shipping.phone}
                  onChange={(e) => {
                    setShipping({ ...shipping, phone: e.target.value });
                  }}
                />
                <button className={styles["button"]} value="submit">
                  Continue
                </button>
              </form>
            </div>
          ) : (
            <div className={styles["step"]}>
              <div className={styles["locked"]}>
                <AiOutlineLock className={styles["lock"]} />
                <div className={styles["name"]}>{name.toUpperCase()}</div>
              </div>
              <RiCheckboxBlankLine className={styles["box"]} />
            </div>
          )}
        </>
      ) : (
        <>
          {/* redirect to stripe payment page */}
          {step >= 2 ? (
            <div className={styles["step-copy"]}>
              <Elements stripe={stripeAuth}>
                <Form data={data} />
              </Elements>
            </div>
          ) : (
            <div className={styles["step"]}>
              <div className={styles["locked"]}>
                <AiOutlineLock className={styles["lock"]} />
                <div className={styles["name"]}>{name.toUpperCase()}</div>
              </div>
              <RiCheckboxBlankLine className={styles["box"]} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Steps;
