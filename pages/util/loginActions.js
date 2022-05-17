import axios from "axios";
import Cookie from "js-cookie";

import { addingCookie } from "./auth";

export const login = async (data, setError) => {
  try {
    const loggingUser = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      data
    );
    if (loggingUser) {
      addingCookie(loggingUser.data.token);
      Cookie.set("email", data.email);
    }
  } catch (err) {
    console.log(err, "error in login function");
    setError(true);
  }
};

export const signup = async (data, setError) => {
  try {
    const createUser = await axios.post(
      "http://localhost:3000/api/v1/auth/register",
      data
    );
    // if(!createUser) throw 'user was not created'
    if (createUser) {
      addingCookie(createUser.data.token);
      Cookie.set("email", data.email);
    }
  } catch (err) {
    console.log(err, "happend in signup function");
    setError(true);
  }
};
