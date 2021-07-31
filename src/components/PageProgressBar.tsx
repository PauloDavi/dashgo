import { theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

export function PageProgressBar() {
  return (
    <NextNProgress
      options={{ showSpinner: false }}
      color={theme.colors.green[500]}
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
}
