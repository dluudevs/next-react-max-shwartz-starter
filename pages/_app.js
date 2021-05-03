import Head from "next/head";
import "../styles/globals.css";

import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* Apply a general title here, pages will have their own head. Next JS will merge all the content inside head and use the latest content if there are conflicts. Including a title in the root level in page level, the page level head will be used */}
        <title>Next Events</title>
        <meta name="description" content="Next JS Events"/>
        <meta name="viewport "content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
