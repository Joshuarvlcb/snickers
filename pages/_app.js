import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  console.log(Component);
  const pageProps = {};
  return { pageProps };
};

export default MyApp;
