import "../styles/globals.css";
import Layout from "./components/Layout";
import { redirect, baseURL } from "./util/auth";
import axios from "axios";
import { parseCookies } from "nookies";
function MyApp({ Component, pageProps }) {
  return (
    <Layout popularShoes={pageProps.popular.popularShoes}>
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
  let pageProps = {};
  const { token, email } = parseCookies(ctx);
  const protectedRoutes = ["/signup", "/login"];

  if (token && protectedRoutes.includes(ctx.pathname)) redirect(ctx, "/");
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx);
  if (token) {
    const user = await axios.post(baseURL + "auth", { email: email });
    pageProps.email = user.email;
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
