import { Icon, Link as ChakraLink, Text, LinkProps } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends LinkProps {
  icon: IconType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        px="4"
        py="2"
        borderRadius="full"
        _focus={{
          shadow: '0 0 0 3px var(--chakra-colors-green-500)',
        }}
        align="conter"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontSize="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
