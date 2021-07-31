import { createContext, ReactNode } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface SidBarDrawerProviderProps {
  children: ReactNode;
}

type SidBarContextData = UseDisclosureReturn;

const SidBarContext = createContext({} as SidBarContextData);

export function SidBarDrawerProvider({ children }: SidBarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const { asPath } = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [disclosure, asPath]);

  return (
    <SidBarContext.Provider value={disclosure}>
      {children}
    </SidBarContext.Provider>
  );
}

export function useSidBarDrawer() {
  return useContext(SidBarContext);
}
