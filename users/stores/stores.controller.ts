import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Person, Store } from "./stores.types.ts";
import { personValidate, storeValidate } from "./stores.validation.ts";
import { addPerson, addStore, findUserStore } from "./stores.service.ts";
import { AppContext } from "/utils/types.ts";

const storesRouter = new Router();

storesRouter
  .get("/", authMiddleware , async (context: AppContext): Promise<Store> => {
    const userid = context?.user?._id!;
    const allStore = await findUserStore(userid, context)
    return context.response.body = allStore;
  })
  .post("/", authMiddleware, validate(storeValidate), async (context: AppContext): Promise<{ message: string}> => {
    const store: Store = await context.request.body().value;
    const userid = context?.user?._id!;
    const newStore = await addStore(store, userid, context);
    return context.response.body = newStore;
  })
  .post("/person", authMiddleware, validate(personValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const person: Person = await context.request.body().value;
    // const storeId = context?.user?._id!;
    const storeId = "6524120c15cc62d0379d2909";
    console.log("storeId", storeId)
    const editedPerson = await addPerson(person, storeId, context);
    return context.response.body = editedPerson;
  })

  export default storesRouter;