import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Paulo Davi</Text>
          <Text color="gray.300" fontSize="small">
            paulo.araujo@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Paulo Davi"
        src="https://github.com/PauloDavi.png"
      />
    </Flex>
  );
}
