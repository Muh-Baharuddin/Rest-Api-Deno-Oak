import { Store } from "/stores/stores.types.ts";
import { db } from "/database/mongodb.ts";

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

export const findByStoreName = async(name: string): Promise<Store | undefined> => {
  return await storeCollection.findOne(
    { name },
  );
}

export const CreateNewStore = async(store: Store): Promise<{ message: string}> => {
  await storeCollection.insertOne(store);
  return {
    message: "create new store success"
  }
}