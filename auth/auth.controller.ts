import { Router } from "$oak/mod.ts";
import { TokenResponse } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";
import { validate } from "/middlewares/validate.ts";
import { UserDto, userValidate } from "/users/dto/user.dto.ts";
import { loginValidate } from "./dto/auth.dto.ts";

const authRouter = new Router();

authRouter
  .post("/login", validate(loginValidate), async (context): Promise<TokenResponse> => {
    const userData = await context.request.body().value;
    const { token, refreshToken } = await login(userData, context);

    return context.response.body = {
      token,
      refreshToken
    };
  })
  .post("/register", validate(userValidate), async (context): Promise<TokenResponse> => {
    const userData: UserDto = await context.request.body().value;

    const newData = await register(userData, context);
    return context.response.body = newData;
  });

export default authRouter;
