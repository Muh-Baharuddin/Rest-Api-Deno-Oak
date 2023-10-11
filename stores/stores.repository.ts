import { Person, Store } from "./stores.types.ts";
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
  console.log("data", data)
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

export const deleteUserStore = async (storeId: string): Promise<{message: string}> => {
  await storeCollection.deleteOne(
    { _id: new ObjectId(storeId)} as unknown as Store,
  )
  return {
    message: "delete store success"
  }
};

export const storePerson = async (person: Person, idStore: string): Promise<{message: string}> => {
  const personId = new ObjectId() as unknown as string;
  person._id = personId;

  const data = await storeCollection.updateOne(
    { _id: new ObjectId(idStore)} as unknown as Store,
    { $setOnInsert: {person}},
    { upsert: true }
  )
  console.log("data", data)
  return {
    message: "add store person success"
  }
};