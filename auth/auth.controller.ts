import { Router } from "$oak/mod.ts";
import { TokenResponse } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";
import { validate } from "/middlewares/validate.ts";
import { RegisterDto, loginValidate, registerValidate } from "./dto/auth.dto.ts";

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
  .post("/register", validate(registerValidate), async (context): Promise<TokenResponse> => {
    const userData: RegisterDto = await context.request.body().value;

    const newData = await register(userData, context);
    return context.response.body = newData;
  });

export default authRouter;
