import React, { useState, useEffect } from "react";
import { signup as signupAction } from "../util/loginActions";
import Link from "next/link";

/*
??state
username email password loading picture
submit disabled

??Functions
check to see if username exist
submit function 
onchnage function

make err




*/
const signup = () => {
  const [setLoading, setSetLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [data, setData] = useState({ username: "", email: "", password: "" });

  return setLoading ? (
    <>
      <h1>loading</h1>
    </>
  ) : (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          signupAction(
            data.username,
            data.email,
            data.password,
            setSetLoading,
            setSubmitDisabled,
            setErrMsg
          );
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button type="submit" disabled={submitDisabled}>
          sign up!
        </button>
        <Link href="/login">
          <a>login</a>
        </Link>
        {errMsg && <h1>there is an error</h1>}
      </form>
    </>
  );
};

export default signup;
