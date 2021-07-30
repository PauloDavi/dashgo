import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="green.500"
        bgColor="gray.900"
        variant="field"
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
