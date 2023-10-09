import { ObjectId } from "$mongo/mod.ts";
import { User } from "./users.types.ts";
import { db } from "/database/mongodb.ts";

const userCollection =  db.collection<User>("users");

export const getAllUsers = async (): Promise<User[]> => {
  return await userCollection.find(
    {},
    {projection: {
      username: 1,
      email: 1 
    }}
  ).toArray();
}

export const getUserById = async (_id: string): Promise<User | undefined> => {
  return await userCollection.findOne(
    { _id: new ObjectId(_id)} as unknown as User,
    {projection: {
      username: 1,
      email: 1 
    }}
  );
}

export const userEdit = async (userData: User, _id: string): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id: new ObjectId(_id)} as unknown as User,
    { $set: userData }
  )
  return {
    message: "edit user success"
  }
}

export const deleteUser = async (_id: string): Promise<{message: string}> => {
  await userCollection.deleteOne({ _id: new ObjectId(_id)} as unknown as User)
  return {
    message: "delete user success"
  }
}
