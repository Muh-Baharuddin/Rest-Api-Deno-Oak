import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const authRouter = new Router();

authRouter
  .get("/", (context) => {
    context.response.body = "Hello auth!";
    console.log("context", context);
  })
  .post("/login", (context) => {
    context.response.body = "This is a POST request!";
  });

export default authRouter;
