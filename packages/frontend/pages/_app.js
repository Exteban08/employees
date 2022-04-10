import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import client from '../configs/apollo-client';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../theme/lightTheme';
import '../styles/globals.css';
import { RouteGuard } from '../utility/RouteGuard';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </ThemeProvider>
        </CookiesProvider>
      </ApolloProvider>
    </CacheProvider>
  );
};

export default MyApp;
