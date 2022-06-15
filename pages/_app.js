import "../styles/globals.css";
import Layout from "./components/Layout";
import { redirect, baseURL } from "../util/auth";
import axios from "axios";
import Head from "next/head";

import { parseCookies } from "nookies";
function MyApp({ Component, pageProps }) {
  return (
    <Layout popularShoes={pageProps.popular.popularShoes}>
      <Head>
        <title>Snickers</title>
        {/* <link rel="icon" type="image/x-icon" href="/images/favicon.ico" /> */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  /*
    build page props
    get token 
    protected routes for users logged in are login and signup page


    if(user is logged in and protectedRoute is true)redirect user to the home page

    if(component has getinitialProps) props = await Component.getInitialProps


    return pageProps

    */
  /*
   protected routes if user is logged in protected routes will be login and signup
   if user is not logged in protected routes will be / wishlist cart payment...

   ??I need to check first if the user is logged in?
    yes that way I know whick routes will be protected

    use a variable to let me know if user is logged in 
    if he is protected routes = login sign
    else protedRoutes = [all pages except login & signup]


    check to see if pathname = protected routes 
      if true redirect them to either login or home depeding on the variable
   */
  let pageProps = {};
  const { token, email } = parseCookies(ctx);
  let loggedIn = token ? true : false;
  let protectedRoutes;
  if (loggedIn) {
    protectedRoutes = ["/signup", "/login"];
  } else {
    protectedRoutes = [
      "/",
      "/wishlist",
      "/payment",
      "/sneakers",
      "/cart",
      "/[shoe]",
    ];
  }

  if (protectedRoutes.includes(ctx.pathname)) {
    if (loggedIn) redirect(ctx, "/");
    if (!loggedIn) redirect(ctx, "/login");
  }
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx);
  if (token) {
    const user = await axios.post(baseURL + "auth", { email: email });
    const { _id, username, email: e, cart, wishlist } = user.data;
    pageProps.user = { _id, username, email: e, cart, wishlist };
  }
  const results = await axios.get(
    baseURL + "shoes/popular",
    {},
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  const newest = await axios.get(
    baseURL + "shoes/newest",
    {},
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  pageProps.popular = results.data;
  pageProps.newest = newest.data;
  return { pageProps };
};

export default MyApp;
