import React, { useState, useEffect } from "react";
import Steps from "./components/Steps";
import styles from "../styles/Payment.module.scss";
/*
step component
return jsx

create array with names of step map those return step
props passed in will be setData and name 

*/
const payment = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    account: {
      user: "",
    },
    shippingData: {
      fullName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      zipCode: "",
      country: "",
      state: "",
      phoneNumber: "",
    },
    // payment: {
    //   name: "",
    //   card: {
    //     card_number: "",
    //     data: "",
    //     cvc: "",
    //   },
    // },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles["payment-container"]}>
      <div className={styles["steps-container"]}>
        {["account", "shipping address", "payment"].map((name) => {
          return (
            <Steps
              name={name}
              setData={setData}
              data={data}
              step={step}
              setStep={setStep}
            />
          );
        })}
      </div>
      <h1>order summary</h1>
    </div>
  );
};

export default payment;
