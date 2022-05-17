import React, { useState, useEffect } from "react";
import { signup as createUser } from "./util/loginActions";
import Link from "next/link";
const signup = () => {
  /*
    {
        name:''
    }
    filter find name and change value to e.target.value
    */

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  return (
    <div>
      <form
        action="#"
        onSubmit={async (e) => {
          e.preventDefault();
          createUser(signupData, setError);
        }}
      >
        <input
          required={true}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setSignupData({ ...signupData, username: e.target.value });
          }}
        />
        <input
          required={true}
          type="text"
          placeholder="email"
          onChange={(e) => {
            setSignupData({ ...signupData, email: e.target.value });
          }}
        />
        <input
          required={true}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setSignupData({ ...signupData, password: e.target.value });
          }}
        />

        <Link href="/login">
          <a>login</a>
        </Link>
        <button value="submit">submit</button>
      </form>
      {error ? (
        <>
          <div onClick={() => setError(!error)} className="error">
            email already exists
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default signup;
