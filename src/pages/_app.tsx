import Router from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import produce from 'immer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider } from '@material-ui/pickers';
import NProgress from 'nprogress';

import { UiConfig } from '@config';
import { AuthService } from '@service';
import confiureStore from '@store';
import LayoutTemplate from '@components/Templates/LayoutTemplate';

import '../styles/index.css';

// Redux store
const store = confiureStore();

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Custom App
function MyApp({ Component, pageProps, router }: AppProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  // Theme pallete type changer
  useEffect(() => {
    return store.subscribe(() => {
      const { ui } = store.getState();

      if (isDark !== ui.isDark) {
        setIsDark(ui.isDark);
      }
    });
  }, [isDark]);

  if (process.browser) {
    AuthService.authRoute(router.pathname);
  }

  // Material UI theme
  const theme = useMemo(
    () =>
      createMuiTheme(
        produce(UiConfig.theme, draft => {
          draft.palette = {
            ...UiConfig.theme.palette,
            type: isDark ? 'dark' : 'light'
          };
        })
      ),
    [isDark]
  );

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
      <Provider store={store}>
        {/* Material UI Theme Provider */}
        <ThemeProvider theme={theme}>
          {/* Material UI Pickers Util Provider */}
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Page Layout Component */}
            <LayoutTemplate route={router.route}>
              {/* Next Page Component */}
              <Component {...pageProps} />
            </LayoutTemplate>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
