import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { PageProgressBar } from '@components/PageProgressBar';
import { SidBarDrawerProvider } from '@contexts/SidBarContext';

import { theme } from '../styles/theme';
import 'focus-visible/dist/focus-visible';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidBarDrawerProvider>
        <PageProgressBar />
        <Component {...pageProps} />
      </SidBarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
