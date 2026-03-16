let accessToken: string | undefined = undefined;

export const setAccessToken = (token?: string) => {
  accessToken = token;
  return;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = undefined;
  return;
};
