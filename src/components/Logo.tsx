import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text fontSize={['2xl', '3xl']} fontWeight="bold" letterSpacing="tight">
      DashGo
      <Text as="span" color="green.500" ml="1">
        .
      </Text>
    </Text>
  );
}
