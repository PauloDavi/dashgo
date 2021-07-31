import { useState } from 'react';

import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

interface InputPasswordProps extends Omit<ChakraInputProps, 'type'> {
  name: string;
  label?: string;
  error?: FieldError;
}

export function InputPassword({
  name,
  label,
  error,
  ...rest
}: InputPasswordProps) {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(e => !e);
  }

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup size="md">
        <ChakraInput
          name={name}
          id={name}
          focusBorderColor="green.400"
          bgColor="gray.900"
          borderColor="gray.600"
          variant="outline"
          size="lg"
          pr="14"
          type={show ? 'text' : 'password'}
          {...rest}
        />
        <InputRightElement h="100%" w="16">
          <IconButton
            aria-label={`${show ? 'Hide' : 'Show'} password`}
            icon={<Icon as={show ? RiEyeOffLine : RiEyeLine} fontSize="20" />}
            variant="unstyled"
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
}
