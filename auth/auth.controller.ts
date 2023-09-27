import { Router } from "$oak/mod.ts";
import { z } from "$zod/mod.ts";
import { LoginResponse, UserProfile } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";

const authRouter = new Router();

authRouter
  .post("/login", async (context): Promise<LoginResponse> => {

    const userValidateLogin = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const userData = await context.request.body().value;

    userValidateLogin.parse(userData);

    const { token, refreshToken } = await login(userData, context);

    return context.response.body = {
      token,
      refreshToken
    };
  })
  .post("/register", async (context): Promise<UserProfile> => {

    const userValidateRegister = z.object({
      email: z.string().email(),
      username: z.string().min(3),
      password: z.string().min(6)
    })

    const userData: UserProfile = await context.request.body().value;

    userValidateRegister.parse(userData);

    await register(userData, context);
    return context.response.body = userData;
  });

export default authRouter;

