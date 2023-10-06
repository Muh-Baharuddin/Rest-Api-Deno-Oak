import { create, getNumericDate } from "$djwt/mod.ts";
import { Context } from "$oak/mod.ts";
import * as bcrypt from "$bcrypt/mod.ts";
import { LoginData, LoginResponse } from "./auth.types.ts";
import { findByEmail, findByUsername, insertUser } from "./auth.repository.ts";
import { key } from "/utils/jwt.ts";
import { User } from "/users/users.types.ts";
import { config } from "$dotenv/mod.ts";

// const env = await load();
config({export: true});

export const login = async (userData: LoginData, context: Context): Promise<LoginResponse> => {
  const findUser = await findByEmail(userData.email);

  if (findUser == undefined) {
    context.throw(401)
  }

  const comparePass = bcrypt.compareSync(userData.password, findUser.password);
  if(!comparePass) {
    context.throw(401)
  }

  const user = {
    _id: findUser?._id,
    email: findUser?.email,
    username: findUser?.username,
  }
  const expiredToken = Deno.env.get("JWT_EXPIRED_TOKEN")
  const expiredRefreshToken = Deno.env.get("JWT_EXPIRED_REFRESH_TOKEN")
  console.log("expiredToken", expiredToken)

  const payload = {
    user,
    // exp: getNumericDate(parseInt(env["JWT_EXPIRED_TOKEN"])),
    exp: getNumericDate(parseInt(expiredToken!)),
  };

  const [token, refreshToken] = await Promise.all([
    create({ alg: "HS512", typ: "JWT" }, payload, key),
    create({ alg: "HS512", typ: "JWT" }, {
      ...payload,
      // exp: getNumericDate(parseInt(env["JWT_EXPIRED_REFRESH_TOKEN"]))
      exp: getNumericDate(parseInt(expiredRefreshToken!))
    }, key)
  ]);

  return {
    token,
    refreshToken
  };
}

export const register = async (userData: User, context: Context) => {
  const isEmail = await findByEmail(userData.email);
  const isUsername = await findByUsername(userData.username);

  if(isUsername?.username === userData.username) {
    context.throw(400, "username already exist");
  }

  if(isEmail?.email === userData.email) {
    context.throw(400, "email already exist");
  }

  const salt = bcrypt.genSaltSync(8);
  userData.password = bcrypt.hashSync(userData.password!, salt);

  return await insertUser(userData);
}
