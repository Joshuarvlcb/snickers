import React, { useState, useEffect } from "react";
import Steps from "./components/Steps";
import styles from "../styles/Payment.module.scss";
import { useRouter } from "next/router";
import { getCart } from "../util/cartActions";
/*
step component
return jsx

create array with names of step map those return step
props passed in will be setData and name 

*/
const Payment = ({ email, user }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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
  });
  useEffect(() => {
    const getTotal = async () => {
      const cart = await getCart(user.cart);
      setCart(cart);
      setTotal(
        cart.reduce((acc, { product }) => {
          return acc + product.price;
        }, 0)
      );
    };
    getTotal();
  }, []);

  return (
    <div className={styles["payment-container"]}>
      <div className={styles["steps-container"]}>
        {["account", "shipping address", "payment"].map((name, i) => {
          return (
            <Steps
              key={i}
              name={name}
              setData={setData}
              data={data}
              step={step}
              setStep={setStep}
              email={email}
            />
          );
        })}
      </div>
      <div className={styles["order"]}>
        <div className={styles["header"]}>
          <div className={styles["bag"]}>ORDER SUMMARY</div>
        </div>
        <div className={styles["shoes"]}>
          {cart.length >= 1 ? (
            cart.map(({ product }, i) => {
              return (
                <div className={styles["shoe"]} key={i}>
                  <img
                    src={product.pic}
                    className={styles["image"]}
                    height="50px"
                    alt=""
                  />
                  <div className={styles["shoe-info"]}>
                    <div className={styles["name"]}>{product.name}</div>
                    <div className={styles["price"]}>${product.price}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>cart is empty</h3>
          )}
        </div>
        <div className={styles["total-container"]}>
          <div className={styles["row"]}>
            <div className={styles["sub-total"]}>Subtotal</div>
            <div className={styles["total"]}>${total}.00</div>
          </div>
          <div className={styles["row"]}>
            <div className={styles["sub-total"]}>Shipping</div>
            <div className={styles["total"]}>$0.00</div>
          </div>
          <div className={styles["row"]}>
            <div className={styles["sub-total"]}>Tax</div>
            <div className={styles["total"]}>$0.00</div>
          </div>
        </div>
        <div className={styles["buy-container"]}>
          <div className={styles["order-total"]}>Order Total</div>
          <div className={styles["total"]}>${total}.00</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
