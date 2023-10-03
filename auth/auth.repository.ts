import { User } from "../users/users.types.ts";
import { db } from "/database/mongodb.ts";

const userCollection =  db.collection<User>("users");

export const findByEmail = async(email: string): Promise<User | undefined> => {
  return await userCollection.findOne({
    email,
  });
}

export const insert = async(userData: User) => {
  return await userCollection.insertOne(userData);
}