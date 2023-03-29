import Head from "next/head";

import "../styles/globals.css";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width" //default to all pages
        ></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
