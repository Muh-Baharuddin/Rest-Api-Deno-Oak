import { db } from "../database/mongodb.ts";
import { UserProfile } from "./auth.types.ts";

const userCollection =  db.collection<UserProfile>("users");

export const insert = async(userData: UserProfile) => {
  return await userCollection.insertOne(userData);
}