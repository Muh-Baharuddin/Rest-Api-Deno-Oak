import { Item } from "/items/items.types.ts";
import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";

const itemCollection =  db.collection<Item>("items");

itemCollection.createIndexes({
  indexes: [
    {
      key: {
        "name": 1,
      },
      name: "name"
    },
    {
      key: {
        "price": 1,
      },
      name: "price"
    }
  ]
})

export const getAllItems = async (): Promise<Item[]> => {
  return await itemCollection.find().toArray();
}

export const getItemById = async (_id: ObjectId): Promise<Item | undefined> => {
  return await itemCollection.findOne(
    { _id }
  )
}

export const insertItem = async(item: Item) => {
  return await itemCollection.insertOne(item);
}