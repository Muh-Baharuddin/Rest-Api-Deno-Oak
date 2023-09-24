import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

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

    if (
      jsonData.username === users.username &&
      jsonData.password === users.password
    ) {
      context.response.body = "Success!";
    } else {
      context.response.status = 401;
      context.response.body = "Unauthorized";
    }
  });

export default authRouter;
