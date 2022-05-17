import axios from "axios";
import { setToken, baseURL } from "./index";

export const login = async (username, password, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(`${baseURL}/auth/login`, {
      username,
      password,
    });
    if (!res) return;

    setToken(res.data.token);
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log(err);
  }
  setLoading(false);
};

/*
"username":"joshuarvlcb",
    "email":"joshuarvlcb@gmail.com",
    "password":"randy123"
*/
export const signup = async (
  username,
  email,
  password,
  setLoading,
  submitDisabled,
  setErrMsg
) => {
  try {
    const res = await axios.post(`${baseURL}/auth/register`, {
      username,
      email,
      password,
    });
    setLoading(true);
    submitDisabled(true);
    if (res.status === 500) {
      console.log("hi");
      setErrMsg(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
      return console.log("sign up failed");
    }
    setToken(res.data);
    console.log(res.data);
    return res.data;
  } catch (err) {
    setErrMsg(true);
    console.log("err");
  }
  setLoading(false);
  submitDisabled(false);
  setTimeout(() => {
    setErrMsg(false);
  }, 3000);
};
