import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import confiureStore from '@store';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { UiConfig } from '@config';

import '../styles/index.css';

// Custom App
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>React Skeleton</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>

      {/* Store Provider */}
      <Provider store={confiureStore()}>
        {/* Material UI Theme Provider */}
        <ThemeProvider theme={UiConfig.theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* Next Page Component */}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
