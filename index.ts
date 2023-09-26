import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import authRouter from "./auth/auth.controller.ts";
import usersRouter from "./users/users.controller.ts";

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
    context.response.body = "Hello World!";
  })

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/users", usersRouter.routes(), authRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
