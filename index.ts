import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import authRouter from "./auth/auth.controller.ts";

const app = new Application();
const router = new Router();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

router
  .get("/", (context) => {
    context.response.body = "Hello World!"
  })

  .get("/foo", (context) => {
    context.response.body = "Hello Foo!"
  })

  .get("/bar", (context) => {
    context.response.body = "Hello Bar!"
  })

router.use("/auth",
  authRouter.routes(),
  authRouter.allowedMethods(),
)

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 });