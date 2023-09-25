import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { LoginData, LoginResponse, UserProfile } from "./auth.types.ts";
import { users } from "./auth.controller.ts";
import { db } from "../database/mongodb.ts";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";

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

export const register = async (jsonData: UserProfile, context: Context) => {

  const user = await userCollection.findOne({username: jsonData.username});

  if(user?.username === jsonData.username) {
    context.response.body = "Bad Request";
    context.throw(400);
  }

  const newUser = await userCollection.insertOne(jsonData)
  return newUser;
}