import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { LoginData, LoginResponse, UserProfile } from "./auth.types.ts";
import { db } from "../database/mongodb.ts";
import { findByEmail, insert } from "./auth.repository.ts";
import { key } from "../utils/jwt.ts";

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

  const findUser = await findByEmail(userData.email);

  if (findUser == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }

  const comparePass = await bcrypt.compare(userData.password, findUser.password!);

  if( userData.email !== findUser?.email || !comparePass) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }

  const user = {
    _id: findUser?._id,
    email: findUser?.email,
    username: findUser?.username,
  }

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

  if(user?.username === userData.username || user?.email === userData.email) {
    context.response.body = "Bad Request";
    context.throw(400);
  }

  const salt = await bcrypt.genSalt(8);
  userData.password = await bcrypt.hash(userData.password!, salt);

  return await insert(userData);
}
