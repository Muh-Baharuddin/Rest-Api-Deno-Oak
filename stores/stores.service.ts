import { AppContext } from "/utils/types.ts";
import { createNewStore, deleteStore, editStore, getAllStore, getStoreById } from "./stores.repository.ts";
import { Store } from "./stores.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { StoreDto } from "/stores/dto/store.dto.ts";
import { Address } from "/users/address/address.types.ts";
import { Person } from "/users/person/person.types.ts";
import { getUserPersonData } from "/users/person/person.service.ts";

export const findAllStore = async (): Promise<Store[]> => {
  return await getAllStore();
}

export const findStoreById = async (_id: string, context: AppContext): Promise<Store> => {
  const storeId = new ObjectId(_id)
  const isStore = await getStoreById(storeId)
  
  if (isStore == undefined) {
    context.throw(401)
  }
  return isStore;
}

export const addStore = async (store: StoreDto, context: AppContext): Promise<{ message: string }> => {
  const userId = context.user?._id!;
  const person = await getUserPersonData(userId);
  if (person == undefined) {
    context.throw(401)
  }
  const newStore = storeByDto(store, person)
  return await createNewStore(newStore)
}

export const updateStore = async (store: Store, _id: string, context: AppContext): Promise<{message: string}> => {
  const userId = context.user?._id!;
  const person = await getUserPersonData(userId);
  if (person == undefined) {
    context.throw(401);
  }

  const storeId = new ObjectId(_id);
  const isStore = await getStoreById(storeId)
  if (isStore == undefined) {
    context.throw(401);
  }

  store.updated_by = person;
  store.updated_at = new Date();
  return await editStore(store, storeId);
}

export const removeStore = async (_id: string, context: AppContext): Promise<{message: string}> => {
  const storeId = new ObjectId(_id)
  const isStore = await getStoreById(storeId)
  
  if (isStore == undefined) {
    context.throw(401)
  }
  return await deleteStore(storeId)
}

const storeByDto = (storeDto : StoreDto, person: Person): Store => {
  const data: Store = {
    _id: new ObjectId(),
    name: storeDto.name,
    owner: storeDto.owner,
    address: storeDto.address as Address,
    description: storeDto.description,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: person,
    updated_by: person,
  }
  return data
}