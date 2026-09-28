export interface LoginRequest {
  username: string;
  password: string;
  deviceId?: string;
}

export interface LoginResponse {
  userId?: string;
  username?: string;
  token?: string; // access token
}
