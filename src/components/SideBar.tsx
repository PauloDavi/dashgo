import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine } from 'react-icons/ri';

export function SideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            GERAL
          </Text>
          <Stack spacing="4" mt="8" aling="stretch">
            <Link display="flex" align="conter">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontSize="medium">
                Dashboard
              </Text>
            </Link>

            <Link display="flex" align="conter">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontSize="medium">
                Usuários
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
