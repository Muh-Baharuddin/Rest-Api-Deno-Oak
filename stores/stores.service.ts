import { AppContext } from "/utils/types.ts";
import { createNewStore, deleteStore, editStore, getAllStore, getStoreById } from "./stores.repository.ts";
import { Store } from "./stores.types.ts";

export const findAllStore = async (): Promise<Store[]> => {
  return await getAllStore();
}

export const findStoreById = async (storeId: string, context: AppContext): Promise<Store> => {
  const isStore = await getStoreById(storeId)
  
  if (isStore == undefined) {
    context.throw(401)
  }
  return isStore;
}

export const addStore = async (store: Store): Promise<{ message: string}> => {
  return await createNewStore(store)
}

export const updateStore = async (store: Store, storeId: string, context: AppContext): Promise<{message: string}> => {
  const isStore = await getStoreById(storeId)
  if (isStore == undefined) {
    context.throw(401)
  }

  return await editStore(store, storeId);
}

export const removeStore = async (storeId: string, context: AppContext): Promise<{message: string}> => {
  const isStore = await getStoreById(storeId)
  
  if (isStore == undefined) {
    context.throw(401)
  }
  return await deleteStore(storeId)
}
