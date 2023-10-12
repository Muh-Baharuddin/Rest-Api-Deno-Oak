import { Payload } from "$djwt/mod.ts";
import { User } from "/users/users.types.ts";

export interface TokenResponse {
  token: string;
  refreshToken: string;
}

export interface LoginPayload extends Payload {
  user: User,
}
