import { RouterContext, State } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { createNewStore, editStore, getAllStore, getStoreById } from "./stores.repository.ts";
import { Store } from "./stores.types.ts";
import { getUserById } from "/users/users.repository.ts";

export const findAllStore = async (): Promise<Store[]> => {
  return await getAllStore();
}

export const findStoreById = async (storeId: string, context: AppContext): Promise<Store> => {
  const store = await getStoreById(storeId)
  
  if (store == undefined) {
    context.throw(401)
  }
  return store;
}

export const addStore = async (store: Store, userId: string, context: AppContext): Promise<{ message: string}> => {
  const user = await getUserById(userId)

  if (user == undefined) {
    context.throw(401)
  }
  return await createNewStore(store)
}

export const updateStore = async (store: Store, context: RouterContext<"/:id", { id: string; } & Record<string | number, string | undefined>, State>): Promise<{message: string}> => {
  const userId = (context as AppContext).user?._id;
  const storeId = context?.params?.id
  if (userId == undefined) {
    context.throw(401)
  }

  const user = await getUserById(userId)
  if (user == undefined) {
    context.throw(401)
  }

  return await editStore(store, storeId);
}

// export const removeStore = async (storeId: string, context: Context): Promise<{message: string}> => {
//   const store = await getUserById(_id)
  
//   if (user == undefined) {
//     context.response.body = "Unauthorized";
//     context.throw(401)
//   }
//   return await deleteUser(_id)
// }

// export const addPerson = async (person: Person, storeId: string, _context: Context): Promise<{ message: string}> => {
//   return await storePerson(person, storeId)
// }
