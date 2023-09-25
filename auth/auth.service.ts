import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { LoginData, LoginResponse, UserProfile } from "./auth.types.ts";
import { db } from "../database/mongodb.ts";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { findUser, insert } from "./auth.repository.ts";

const userCollection =  db.collection<UserProfile>("users");

userCollection.createIndexes({
  indexes: [
    {
      key: {
        "username": 1,
      },
      name: "username"
    },
    {
      key: {
        "email": 1,
      },
      name: "index_email"
    }
  ]
})

export const login = async (userData: LoginData, context: Context): Promise<LoginResponse> => {

  const user = await findUser(userData);

  if( userData.email !== user?.email || userData.password !== user?.password) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }

  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const payload = {
    user,
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

export const register = async (userData: UserProfile, context: Context) => {

  const user = await userCollection.findOne({username: userData.username});

  if(user?.username === userData.username) {
    context.response.body = "Bad Request";
    context.throw(400);
  }
  return await insert(userData);
}
