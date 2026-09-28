export const AUTH__KEYS = {
  BASE: ['auth'] as const,
  LOGIN: () => [...AUTH__KEYS.BASE, 'login'] as const,
  LOGOUT: () => [...AUTH__KEYS.BASE, 'logout'] as const,
  REFRESH_TOKEN: () => [...AUTH__KEYS.BASE, 'refresh_token'] as const,
};

export const USER_MANAGEMENT__KEYS = {
  BASE: ['user_management'] as const,
  GET_USERS: () => [...USER_MANAGEMENT__KEYS.BASE, 'get_users'] as const,
  GET_USER: (id: number) => [...USER_MANAGEMENT__KEYS.BASE, 'get_user', id] as const,
};
