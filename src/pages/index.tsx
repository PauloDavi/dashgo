import { Flex, Button, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Form/Input';
import { InputPassword } from '@components/Form/InputPassword';
import { Logo } from '@components/Logo';
import { useAuth } from '@contexts/AuthContext';
import { withSSRGuest } from '@utils/withSSRGuest';

interface SingInFormData {
  email: string;
  password: string;
}

const singInFormSchema = yup.object().shape({
  email: yup.string().required('E-amil obrigatório').email('E-amil inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(singInFormSchema),
  });

  const { singIn } = useAuth();

  const handleSingIn: SubmitHandler<SingInFormData> = async data => {
    await singIn(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        onSubmit={handleSubmit(handleSingIn)}
        flexDir="column"
      >
        <Stack spacing="4">
          <Flex justify="center">
            <Logo />
          </Flex>

          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
          />

          <InputPassword
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="green"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
