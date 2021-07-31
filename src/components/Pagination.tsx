import { Box, Button, HStack } from '@chakra-ui/react';

export function Pagination() {
  return (
    <HStack justify="space-between" align="center" spacing="6" mt="8">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <HStack spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorSchema="green"
          disabled
          _disabled={{
            bg: 'green.500',
            cursor: 'default',
          }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500',
          }}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500',
          }}
        >
          3
        </Button>
      </HStack>
    </HStack>
  );
}
