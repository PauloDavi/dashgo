import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { PageProgressBar } from '@components/PageProgressBar';
import { AuthProvider } from '@contexts/AuthContext';
import { SidBarDrawerProvider } from '@contexts/SidBarContext';
import { makeServer } from '@services/mirage';
import { queryClient } from '@services/queryClient';

import { theme } from '../styles/theme';

import 'focus-visible/dist/focus-visible';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidBarDrawerProvider>
            <PageProgressBar />
            <Component {...pageProps} />
          </SidBarDrawerProvider>
        </ChakraProvider>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
