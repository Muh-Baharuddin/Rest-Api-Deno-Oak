import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { db } from "../database/mongodb.ts";
import { LoginResponse, UserProfile } from "./auth.types.ts";
import { login, register } from "./auth.service.ts";

const testCollection =  db.collection<UserProfile>("test");

const authRouter = new Router();

export const users = {
  email: "rio@gmail.com",
  password: "1234",
};

authRouter
  .get("/", async (context) => {
    const allData = await testCollection.find().toArray();
    context.response.body = allData;
  })
  .post("/login", async (context): Promise<LoginResponse> => {
    const userData = await context.request.body().value;

    if( userData.email !== users.email || userData.password !== users.password) {
      context.response.body = "Unauthorized";
      context.throw(401)
    }

    const { token, refreshToken } = await login(userData);

    return context.response.body = {
      token,
      refreshToken
    };
  })
  .post("/register", async (context): Promise<UserProfile> => {
    const userData: UserProfile = await context.request.body().value;

    await register(userData, context);
    return context.response.body = userData;
  });

export default authRouter;

