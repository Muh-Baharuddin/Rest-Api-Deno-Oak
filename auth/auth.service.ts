import { create, getNumericDate } from "$djwt/mod.ts";
import { Context } from "$oak/mod.ts";
import * as bcrypt from "$bcrypt/mod.ts";
import { LoginPayload, TokenResponse } from "./auth.types.ts";
import { key } from "/utils/jwt.ts";
import { findUserByEmail, findUserByUsername, insertUser } from "/users/users.service.ts";
import { LoginDto, RegisterDto } from "./dto/auth.dto.ts";
import { User } from "/users/users.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { findVerifCode } from "/auth/verification/verification.service.ts";

export const login = async (userData: LoginDto, context: Context): Promise<TokenResponse> => {
  const findUser = await findUserByEmail(userData.email);
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
    person : findUser.person,
  }

  const payload = {
    user,
    exp: getNumericDate(parseInt(Deno.env.get("JWT_EXPIRED_TOKEN")!)),
  };

  const [token, refreshToken] = await Promise.all([
    create({ alg: "HS512", typ: "JWT" }, payload, key),
    create({ alg: "HS512", typ: "JWT" }, {
      ...payload,
      exp: getNumericDate(parseInt(Deno.env.get("JWT_EXPIRED_REFRESH_TOKEN")!))
    }, key)
  ]);

  return {
    token,
    refreshToken
  };
}

export const register = async (registerDto: RegisterDto, context: Context) => {
  const isEmail = await findUserByEmail(registerDto.email);
  const isUsername = await findUserByUsername(registerDto.username);
  if(isEmail?.email === registerDto.email) {
    context.throw(400, "email already exist");
  }

  if(isUsername?.username === registerDto.username) {
    context.throw(400, "username already exist");
  }

  const salt = bcrypt.genSaltSync(8);
  registerDto.password = bcrypt.hashSync(registerDto.password!, salt);

  await findVerifCode(registerDto.email, registerDto.verificationCode, context)

  const newData = userByDto(registerDto);

  await insertUser(newData);
  const user = {
    _id: newData._id,
    email: newData?.email,
    username: newData?.username,
  } as User;

  const payload: LoginPayload = {
    user,
    exp: getNumericDate(parseInt(Deno.env.get("JWT_EXPIRED_TOKEN")!)),
  };

  const [token, refreshToken] = await Promise.all([
    create({ alg: "HS512", typ: "JWT" }, payload, key),
    create({ alg: "HS512", typ: "JWT" }, {
      ...payload,
      exp: getNumericDate(parseInt(Deno.env.get("JWT_EXPIRED_REFRESH_TOKEN")!))
    }, key)
  ]);

  return {
    token,
    refreshToken
  };
}

const userByDto = (userDto : RegisterDto): User => {
  const data: User = {
    _id: new ObjectId(),
    email: userDto.email,
    username: userDto.username,
    password: userDto.password,
    created_at: new Date(),
    updated_at: new Date(),
  }
  return data
}
