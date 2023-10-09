import { Context } from "$oak/mod.ts";
import { CreateNewStore, findByStoreName, getAllStore } from "/stores/stores.repository.ts";
import { Store } from "/stores/stores.types.ts";

export const findAllStore = async (): Promise<Store[]> => {
  return await getAllStore();
}

export const addStore = async (store: Store, _context: Context) => {
  const _isStore = await findByStoreName(store.name);

  return await CreateNewStore(store)
}
