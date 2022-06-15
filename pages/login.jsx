import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
import Cookie from "js-cookie";
import { login as loggingUser } from "../public/util/loginActions";
import styles from "../styles/Auth.module.scss";
const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoginData({
      ...loginData,
      email: Cookie.get("email") ? Cookie.get("email") : "",
    });
  }, []);

  return (
    <div className={styles["auth"]}>
      <div className={styles["form-container"]}>
        <div
          className={styles["login-container"]}
          style={{
            marginTop: `${error ? "4rem" : "0"}`,
            marginBottom: `${error ? "4rem" : "0"}`,
          }}
        >
          <h1 className={styles["title"]}>Sign in</h1>
          <p className={styles["text"]}>
            Dont have an account?{" "}
            <Link href="/signup">
              <a className={styles["link"]}> Create account</a>
            </Link>
          </p>
          <form
            action="#"
            className={styles["column"]}
            onSubmit={(e) => {
              e.preventDefault();
              loggingUser(loginData, setError);
            }}
          >
            <input
              required={true}
              className={styles["input"]}
              type="text"
              value={loginData.email}
              placeholder="Email"
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <input
              required={true}
              className={styles["input"]}
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <button value="submit" className={styles["button"]}>
              Login
            </button>
          </form>
          {error ? (
            <>
              <div className={styles["error"]}>
                <IoCloseCircleOutline className={styles["close"]} />
                Email or password not correct.
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

export default Login;
