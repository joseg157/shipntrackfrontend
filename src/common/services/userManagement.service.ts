import { api } from '@lib/api';
import type { User } from '@features/userManagement';

export const getUsers = () =>
  api<User[]>({
    method: 'GET',
    url: 'UserManagement/users',
  });

export const getUserById = (id: number) =>
  api<User>({
    method: 'GET',
    url: `UserManagement/users/${id}`,
  });
