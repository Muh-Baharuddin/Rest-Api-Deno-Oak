import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9.1/mod.ts";

const authRouter = new Router();

const users = {
  username: "rio",
  password: "123",
};

authRouter
  .get("/", (context) => {
    context.response.body = "Hello auth!";
    console.log("context", context);
  })
  .post("/login", async (context) => {
    const jsonData = await context.request.body().value;

    if( jsonData.username !== users.username || jsonData.password !== users.password) {
      context.response.status = 401,
      context.response.body = "Unauthorized";
      return 
    }

    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );

    const payload = {
      users,
      exp: getNumericDate(24 * 60 * 60),
    };

    const token = await create({ alg: "HS512", typ: "JWT" }, payload, key);
    const refreshToken = await create({ alg: "HS512", typ: "JWT" }, {
      ...payload,
      exp: getNumericDate(30 * 24 * 60 * 60)
    }, key);

    context.response.body = {
      token,
      refreshToken
    }    
  })

export default authRouter;
