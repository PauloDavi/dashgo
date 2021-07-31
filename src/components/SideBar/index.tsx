import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSidBarDrawer } from '@contexts/SidBarContext';

import { SidBarNav } from './SidBarNav';

export function SideBar() {
  const { isOpen, onClose } = useSidBarDrawer();

  const isDrawerSidBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidBarNav />
    </Box>
  );
}
