import { ObjectId } from "$mongo/mod.ts";
import { Category } from "/categories/categories.types.ts";
import { db } from "/database/mongodb.ts";

const categoryCollection =  db.collection<Category>("categories");

categoryCollection.createIndexes({
  indexes: [
    {
      key: {
        "name": 1,
      },
      name: "name"
    }
  ]
})

export const getAllCategories = async (): Promise<Category[]> => {
  return await categoryCollection.find().toArray();
}

export const getCategoryById = async (_id: ObjectId): Promise<Category | undefined> => {
  return await categoryCollection.findOne(
    { _id }
  )
}

export const getCategoryByName = async (name: string): Promise<Category | undefined> => {
  return await categoryCollection.findOne(
    { name },
    {projection: { _id: 1 }}
  )
}

export const insertCategory = async(category: Category) => {
  return await categoryCollection.insertOne(category);
}

export const editCategory = async (category: Category, _id: ObjectId): Promise<{message: string}> => {
  await categoryCollection.updateOne(
    { _id },
    { $set: category }
  )
  return {
    message: "edit category success"
  }
}

export const deleteCategory = async (_id: ObjectId): Promise<{message: string}> => {
  await categoryCollection.deleteOne({ _id })
  return {
    message: "delete category success"
  }
}