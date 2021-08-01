import { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Thead,
  Td,
  Th,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiEyeLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '@components/Header';
import { Pagination } from '@components/Pagination';
import { SideBar } from '@components/SideBar';
import { useUsers, prefetchUser } from '@hooks/users/useUsers';

export default function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Link href="users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter Elementos</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['2', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="green" />
                    </Th>
                    <Th fontSize="md">Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['2', '4', '6']}>
                        <Checkbox colorScheme="green" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        <HStack spacing="2">
                          <Link href={`users/edit/${user.id}`} passHref>
                            <Button
                              as="a"
                              size="sm"
                              onMouseEnter={() => prefetchUser(user.id)}
                              fontSize="sm"
                              colorScheme="teal"
                            >
                              <Icon as={RiPencilLine} fontSize="16" />
                              {isWideVersion && <Text ml="2">Editar</Text>}
                            </Button>
                          </Link>

                          <Link href={`users/view/${user.id}`} passHref>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              onMouseEnter={() => prefetchUser(user.id)}
                              colorScheme="teal"
                            >
                              <Icon as={RiEyeLine} fontSize="16" />
                              {isWideVersion && <Text ml="2">Visualizar</Text>}
                            </Button>
                          </Link>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                currentPage={page}
                totalCountOfRegisters={data.totalCount}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);
//   console.log(users, totalCount);

//   return {
//     props: {
//       users,
//       totalCount,
//     },
//   };
// };
