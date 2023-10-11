import { Store } from "./stores.types.ts";
import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

const storeCollection =  db.collection<Store>("stores");

storeCollection.createIndexes({
  indexes: [
    {
      key: {
        "name": 1,
      },
      name: "name"
    },
  ]
})

export const getAllStore = async (): Promise<Store[]> => {
  return await storeCollection.find().toArray();
}

export const getStoreById = async (userId: string): Promise<Store> => {
  const data = await storeCollection.findOne(
    { _id: new ObjectId(userId) } as unknown as User,
  )
  return data!;
}

export const createNewStore = async(store: Store): Promise<{ message: string}> => {
  await storeCollection.insertOne(store)
  return {
    message: "create new store success"
  }
}

export const editStore = async (store: Store, storeId: string): Promise<{message: string}> => {
  await storeCollection.updateOne(
    { _id: new ObjectId(storeId)} as unknown as Store,
    { $set: store }
  )
  return {
    message: "edit store success"
  }
};

export const deleteStore = async (storeId: string): Promise<{message: string}> => {
  await storeCollection.deleteOne(
    { _id: new ObjectId(storeId)} as unknown as Store,
  )
  return {
    message: "delete store success"
  }
};
