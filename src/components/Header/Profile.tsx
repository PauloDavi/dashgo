import {
  Avatar,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { RiCloseLine, RiEditLine } from 'react-icons/ri';

import { useAuth } from '@contexts/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, singOut } = useAuth();

  return (
    <Menu>
      <MenuButton>
        <Flex align="center">
          {showProfileData && (
            <Box mr="4" textAlign="right">
              <Text>Paulo Davi</Text>
              <Text color="gray.300" fontSize="small">
                {user?.email}
              </Text>
            </Box>
          )}

          <Avatar
            size="md"
            name="Paulo Davi"
            src="https://github.com/PauloDavi.png"
          />
        </Flex>
      </MenuButton>

      <MenuList bg="gray.700" border="none">
        <MenuItem
          onClick={singOut}
          _hover={{ bg: 'gray.800' }}
          _focus={{ bg: 'gray.900' }}
          icon={<Icon as={RiCloseLine} fontSize="20" />}
        >
          Sair
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'gray.800' }}
          _focus={{ bg: 'gray.900' }}
          icon={<Icon as={RiEditLine} fontSize="20" />}
        >
          Editar Perfil
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
