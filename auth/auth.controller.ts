import { Router } from "https://deno.land/x/oak/mod.ts";

const authRouter = new Router()

authRouter
  .get("/", (context) => {
    context.response.body = "Hello auth!"
    console.log( "context", context)
  })

export default authRouter;