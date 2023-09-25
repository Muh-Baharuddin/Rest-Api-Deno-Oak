import { db } from "../database/mongodb.ts";
import { LoginData, UserProfile } from "./auth.types.ts";

const userCollection =  db.collection<UserProfile>("users");

export const findUser = async(userData: LoginData): Promise<LoginData | undefined> => {
  return await userCollection.findOne({
    email: userData.email,
    password: userData.password,
  });
}

export const insert = async(userData: UserProfile) => {
  return await userCollection.insertOne(userData);
}