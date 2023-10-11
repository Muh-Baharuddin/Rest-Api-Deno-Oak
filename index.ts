import { Application, Router } from "$oak/mod.ts";
import authRouter from "./auth/auth.controller.ts";
import storesRouter from "./stores/stores.controller.ts";
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
    context.response.body = "Hello Dunia!";
  })
  

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/users", usersRouter.routes(), usersRouter.allowedMethods());
router.use("/store", storesRouter.routes(), storesRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
