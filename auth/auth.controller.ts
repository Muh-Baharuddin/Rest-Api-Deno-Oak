import { Router } from "$oak/mod.ts";
import { LoginResponse, UserProfile } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";
import { validate } from "/middlewares/validate.ts";
import { userValidateLogin, userValidateRegister } from "/auth/auth.validation.ts";

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
  .post("/register", validate(userValidateRegister), async (context): Promise<UserProfile> => {
    const userData: UserProfile = await context.request.body().value;

    await register(userData, context);
    return context.response.body = userData;
  });

export default authRouter;

