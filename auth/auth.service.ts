import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { LoginData, LoginResponse, UserProfile } from "./auth.types.ts";
import { users } from "./auth.controller.ts";
import { db } from "../database/mongodb.ts";

const userCollection =  db.collection<UserProfile>("users");

export const login = async (jsonData: LoginData): Promise<LoginResponse> => {
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const payload = {
    users,
    exp: getNumericDate(24 * 60 * 60),
  };

  const [token, refreshToken] = await Promise.all([
    create({ alg: "HS512", typ: "JWT" }, payload, key),
    create({ alg: "HS512", typ: "JWT" }, {
      ...payload,
      exp: getNumericDate(30 * 24 * 60 * 60)
    }, key)
  ]);

  return {
    token,
    refreshToken
  };
}

export const register = async (jsonData: UserProfile) => {


}