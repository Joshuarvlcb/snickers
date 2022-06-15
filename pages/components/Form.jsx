import React from "react";
import axios from "axios";
import styles from "../../styles/Payment.module.scss";
import { baseURL } from "../util/auth";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const Form = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      width: "100%",
      base: {
        color: "blue",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("foo");
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (!result) return console.log("result is not valid");
    createPayment(result.token);
  };
  const createPayment = async (token, price = 100000) => {
    // console.log(JSON.stringify({ token: token.id }));
    /*
    post request to my server;
    */
    if (!token) return;
    let email = data.account.email;
    const result = await axios.post(`${baseURL}payment`, {
      token: token.id,
      price,
    });
    // if (result.status !== 200) return;
    //send email
    // const emailResult = await axios.post(`${baseURL}email`, {
    //   email: email,
    // });
    // console.log(emailResult);
  };
  return (
    <div>
      <form action="#" onSubmit={handleSubmit} className={styles["payment"]}>
        <CardElement
          className={styles["card-input"]}
          options={CARD_ELEMENT_OPTIONS}
        />
        <button className={styles["buy"]}>Buy</button>
      </form>
    </div>
  );
};

export default Form;
