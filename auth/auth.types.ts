export interface UserProfile {
  _id?: string;
  email: string;
  username: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
