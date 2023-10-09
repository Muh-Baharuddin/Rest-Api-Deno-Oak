import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Store } from "/stores/stores.types.ts";
import { storeValidate } from "/stores/stores.validation.ts";
import { addStore, findAllStore } from "/stores/stores.service.ts";

const storesRouter = new Router();

storesRouter
  .get("/", authMiddleware , async (context): Promise<Store[]> => {
    const allStore = await findAllStore()
    return context.response.body = allStore;
  })
  .post("/", authMiddleware, validate(storeValidate), async (context): Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const newStore = await addStore(store, context);
    return context.response.body = newStore;
  })

  export default storesRouter;