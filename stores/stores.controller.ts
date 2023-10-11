import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Store } from "./stores.types.ts";
import { storeValidate } from "./stores.validation.ts";
import { addStore, findAllStore, findStoreById, removeStore, updateStore } from "./stores.service.ts";

const storesRouter = new Router();

storesRouter
  .get("/", authMiddleware , async (context): Promise<Store[]> => {
    const allStore = await findAllStore()
    return context.response.body = allStore;
  })
  .get("/:id", authMiddleware, async (context): Promise<Store> => {
    const storeId = context?.params?.id;
    const store = await findStoreById(storeId, context)
    return context.response.body = store;
  })
  .post("/", authMiddleware, validate(storeValidate), async (context): Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const newStore = await addStore(store);
    return context.response.body = newStore;
  })
  .put("/:id", authMiddleware, validate(storeValidate), async (context) : Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const storeId = context?.params?.id;
    const editedStore = await updateStore(store, storeId, context);
    return context.response.body = editedStore;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const storeId = context?.params?.id;
    const deleted = await removeStore(storeId, context);
    return context.response.body = deleted;
  });

  export default storesRouter;