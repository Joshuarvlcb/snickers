import Cookies from "js-cookie";
import Router from "next/router";

export const baseURL = "http://localhost:3000/api/v1";

export const setToken = (token) => {
  Cookies.set("token", token);
  Router.push("/");
};
