import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { UserProfile } from "../auth/auth.types.ts";
import { db } from "../database/mongodb.ts";

const userCollection =  db.collection<UserProfile>("users");

export const getAllUsers = async (): Promise<UserProfile[]> => {
  return await userCollection.find().toArray();
}

export const getUserById = async (_id: string): Promise<UserProfile | undefined> => {
  return await userCollection.findOne({ _id: new ObjectId(_id) });
}

export const userEdit = async (userData: UserProfile, _id: string) => {
  return await userCollection.updateOne(
    { _id: {$eq: new ObjectId(_id)}},
    { $set: userData }
  )
}