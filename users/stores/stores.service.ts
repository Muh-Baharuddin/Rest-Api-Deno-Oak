import { Context } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { CreateNewStore, getStoreById, storePerson } from "./stores.repository.ts";
import { Person, Store } from "./stores.types.ts";
import { getUserById } from "/users/users.repository.ts";

export const findUserStore = async (userId: string, context: AppContext): Promise<Store> => {
  const user = await getUserById(userId)

  if (user == undefined) {
    context.throw(401)
  }
  return await getStoreById(userId);
}

export const addStore = async (store: Store, userId: string, context: AppContext): Promise<{ message: string}> => {
  const user = await getUserById(userId)

  if (user == undefined) {
    context.throw(401)
  }
  return await CreateNewStore(store, userId)
}

export const addPerson = async (person: Person, storeId: string, _context: Context): Promise<{ message: string}> => {
  return await storePerson(person, storeId)
}
