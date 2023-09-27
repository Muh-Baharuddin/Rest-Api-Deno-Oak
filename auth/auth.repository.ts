import { db } from "/database/mongodb.ts";
import { UserProfile } from "./auth.types.ts";

const userCollection =  db.collection<UserProfile>("users");

export const findByEmail = async(email: string): Promise<UserProfile | undefined> => {
  return await userCollection.findOne({
    email,
  });
}

export const insert = async(userData: UserProfile) => {
  return await userCollection.insertOne(userData);
}