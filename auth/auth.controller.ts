import { Router } from "$oak/mod.ts";
import { LoginResponse } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";
import { validate } from "/middlewares/validate.ts";
import { userValidateLogin, userValidateRegister } from "/auth/auth.validation.ts";
import { User } from "/users/user.types.ts";

const authRouter = new Router();

authRouter
  .post("/login", validate(userValidateLogin), async (context): Promise<LoginResponse> => {
    const userData = await context.request.body().value;
    const { token, refreshToken } = await login(userData, context);

    return context.response.body = {
      token,
      refreshToken
    };
  })
  .post("/register", validate(userValidateRegister), async (context): Promise<User> => {
    const userData: User = await context.request.body().value;

    await register(userData, context);
    return context.response.body = userData;
  });

export default authRouter;

