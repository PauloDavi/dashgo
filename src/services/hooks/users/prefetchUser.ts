import { api } from '@services/api';
import { queryClient } from '@services/queryClient';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUser(userId: string) {
  const { data } = await api.get<User>(`uses/${userId}`);

  const user = {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return user;
}

export async function prefetchUser(userId: string) {
  await queryClient.prefetchQuery(
    ['user', userId],
    async () => {
      const response = await api.get(`uses/${userId}`);

      return response.data;
    },
    { staleTime: 1000 * 60 * 10 } // 10 minutes
  );
}
