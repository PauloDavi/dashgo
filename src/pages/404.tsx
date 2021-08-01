import { Divider, Flex, Stack, Icon, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RiArrowLeftLine } from 'react-icons/ri';

export default function PageNotFound() {
  const router = useRouter();

  return (
    <Flex
      h="100vh"
      w="100%"
      justify="center"
      align="center"
      px="4"
      fontSize={['20', '28']}
    >
      <Stack direction="row" h="24" spacing="4" align="center">
        <IconButton
          aria-label="back"
          variant="unstyled"
          onClick={router.back}
          icon={<Icon as={RiArrowLeftLine} fontSize="42" />}
        />

        <Divider orientation="vertical" />

        <Text>
          <Text fontWeight="bold">404</Text> Pagina não não existe
        </Text>
      </Stack>
    </Flex>
  );
}
