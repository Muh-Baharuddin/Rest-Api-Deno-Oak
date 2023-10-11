import { Person, Store } from "./stores.types.ts";
import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

const userCollection =  db.collection<User>("users");

export const getStoreById = async (userId: string): Promise<Store> => {
  const data = await userCollection.findOne(
    { _id: new ObjectId(userId) } as unknown as User,
    { projection: {
      store: 1
    }}
  )
  return data?.store!;
}

export const CreateNewStore = async(store: Store, userId: string): Promise<{ message: string}> => {
  const storeId = new ObjectId() as unknown as string;
  store._id = storeId;
  await userCollection.updateOne(
    { _id: new ObjectId(userId)} as unknown as User,
    { $set: {store}},
  )
  return {
    message: "create new store success"
  }
}

export const storePerson = async (person: Person, idStore: string): Promise<{message: string}> => {
  const personId = new ObjectId() as unknown as string;
  person._id = personId;

  const data = await userCollection.updateOne(
    { _id: new ObjectId(idStore)} as unknown as Store,
    { $setOnInsert: {person}},
    { upsert: true }
  )
  console.log("data", data)
  return {
    message: "add store person success"
  }
};