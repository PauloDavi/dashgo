import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '@services/api';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ApiResponse {
  users: User[];
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
