import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { login as loginController } from "../util/loginActions";
import Link from "next/link";
/*
if user does not exist or password invalid display modal

when user logins in save token in cookies

*/

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [password, username]);
  const handleChange = (e, text) => {
    if (text === "username") return setUsername(e.target.value);
    setPassword(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    loginController(username, password, setLoading);
    setUsername("");
    setPassword("");
    /*
    make post request to login
    set token in cokkies

    check to see if it went through
      if not display modal
    if yes redirect to main page
    
    */
  };
  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <h1>login </h1>
          <form action="" onSubmit={submit}>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e, "username")}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <button value="submit">login</button>
            <Link href="/signup">
              <a>sign up</a>
            </Link>
          </form>
        </>
      )}
    </>
  );
};

export default login;
