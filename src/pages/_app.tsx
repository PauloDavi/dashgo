import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { makeServer } from 'src/services/mirage';
import { queryClient } from 'src/services/queryClient';

import { PageProgressBar } from '@components/PageProgressBar';
import { SidBarDrawerProvider } from '@contexts/SidBarContext';

import { theme } from '../styles/theme';

import 'focus-visible/dist/focus-visible';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidBarDrawerProvider>
          <PageProgressBar />
          <Component {...pageProps} />
        </SidBarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
