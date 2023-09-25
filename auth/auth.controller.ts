import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { db } from "../database/mongodb.ts";
import { LoginResponse } from "./auth.types.ts";
import { login } from "./auth.service.ts";

// deno-lint-ignore no-explicit-any
const testCollection =  db.collection<any>("users");

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
    const jsonData = await context.request.body().value;

    if( jsonData.email !== users.email || jsonData.password !== users.password) {
      context.response.body = "Unauthorized";
      context.throw(401)
    }

    const { token, refreshToken } = await login(jsonData);

    return context.response.body = {
      token,
      refreshToken
    };
  })

export default authRouter;
