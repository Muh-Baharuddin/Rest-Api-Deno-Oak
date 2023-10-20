import { Store } from "./stores.types.ts";
import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";

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

export const getStoreById = async (_id: ObjectId): Promise<Store | undefined> => {
  const data = await storeCollection.findOne(
    { _id },
  )
  return data;
}

export const createNewStore = async(store: Store): Promise<{ message: string}> => {
  await storeCollection.insertOne(store)
  return {
    message: "create new store success"
  }
}

export const editStore = async (store: Store, _id: ObjectId): Promise<{message: string}> => {
  await storeCollection.updateOne(
    { _id },
    { $set: store }
  )
  return {
    message: "edit store success"
  }
};

export const deleteStore = async (_id: ObjectId): Promise<{message: string}> => {
  await storeCollection.deleteOne(
    { _id },
  )
  return {
    message: "delete store success"
  }
};
