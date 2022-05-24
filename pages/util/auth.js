import Cookie from "js-cookie";
import Router from "next/router";

export const baseURL = "http://localhost:3000/api/v1/";

export const addingCookie = (token) => {
  Cookie.set("token", token);
  Router.push("/");
};

export const logoutUser = (email) => {
  Cookie.remove("token");
  Router.push("/login");
};
export const redirect = (ctx, page) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: page });
    ctx.res.end();
  } else {
    Router.push(page);
  }
};
