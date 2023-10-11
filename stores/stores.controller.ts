import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Store } from "./stores.types.ts";
import { storeValidate } from "./stores.validation.ts";
import { addStore, findAllStore, findStoreById, updateStore } from "./stores.service.ts";
import { AppContext } from "/utils/types.ts";

const storesRouter = new Router();

storesRouter
  .get("/", authMiddleware , async (context): Promise<Store[]> => {
    const allStore = await findAllStore()
    return context.response.body = allStore;
  })
  .get("/:id", authMiddleware, async (context): Promise<Store> => {
    const storeId = context?.params?.id;
    const store = await findStoreById(storeId!, context)
    return context.response.body = store;
  })
  .post("/", authMiddleware, validate(storeValidate), async (context: AppContext): Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const userid = context?.user?._id!;
    const newStore = await addStore(store, userid, context);
    return context.response.body = newStore;
  })
  .put("/:id", authMiddleware, validate(storeValidate), async (context) : Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const editedStore = await updateStore(store, context);
    return context.response.body = editedStore;
  })
  // .post("/person", authMiddleware, validate(personValidate), async (context: AppContext) : Promise<{ message: string}> => {
  //   const person: Person = await context.request.body().value;
  //   const storeId = context?.user?._id!;
  //   const storeId = "6524120c15cc62d0379d2909";
  //   console.log("storeId", storeId)
  //   const editedPerson = await addPerson(person, storeId, context);
  //   return context.response.body = editedPerson;
  // })

  export default storesRouter;