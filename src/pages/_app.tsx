import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Head>
          <title>Fluencia</title>
          <meta name="description" content="Fluencia" />
          <link rel="icon" href="../../public/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </>
    </QueryClientProvider>
  );
};

export default MyApp;
