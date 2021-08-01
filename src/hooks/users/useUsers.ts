import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '@services/api';
import { queryClient } from '@services/queryClient';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ApiResponse {
  users: User[];
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

export async function getUsers(page: number) {
  const { data, headers } = await api.get<ApiResponse>('users', {
    params: { page },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
}

interface useUsersData extends ApiResponse {
  totalCount: number;
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<useUsersData>
) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
