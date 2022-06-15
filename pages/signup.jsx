import React, { useState, useEffect } from "react";
import { signup as createUser } from "../util/loginActions";
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "../styles/Auth.module.scss";
const Signup = () => {
  /*
    {
        name:''
    }
    filter find name and change value to e.target.value
    
    state for what the error is

    errors 
    password has to be 5 characters long

    email has to be valid
    server will return if email is taken or if email is not valid

    */

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className={styles["auth"]}>
      <div className={styles["form-container"]}>
        <div
          className={styles["signup-container"]}
          style={{
            marginTop: `${error ? "4rem" : "0"}`,
            marginBottom: `${error ? "4rem" : "0"}`,
          }}
        >
          <h1 className={styles["title"]}>Create account</h1>
          <p className={styles["text"]}>
            Already have an account?{" "}
            <Link href="/login">
              <a className={styles["link"]}>Sign in</a>
            </Link>
          </p>
          <form
            className={styles["column"]}
            action="#"
            onSubmit={async (e) => {
              e.preventDefault();
              if (signupData.password.length < 5)
                return (
                  setErrorMsg("Password has to be at least 5 characters long"),
                  setError(true)
                );
              if (
                !new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(
                  signupData.email
                )
              )
                return setErrorMsg("Email is not valid"), setError(true);

              createUser(signupData, setError, setErrorMsg);
            }}
          >
            <input
              className={styles["input"]}
              required={true}
              type="text"
              placeholder="name"
              onChange={(e) => {
                setSignupData({ ...signupData, username: e.target.value });
              }}
            />

            <input
              className={styles["input"]}
              required={true}
              type="text"
              placeholder="email"
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
              }}
            />
            <input
              className={styles["input"]}
              required={true}
              type="password"
              placeholder="password"
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
              }}
            />

            <button className={styles["button"]} value="submit">
              submit
            </button>
          </form>
          {error ? (
            <>
              <div className={styles["error"]}>
                <IoCloseCircleOutline className={styles["close"]} />
                {errorMsg}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
