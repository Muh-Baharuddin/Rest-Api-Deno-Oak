import { ObjectId } from "$mongo/mod.ts";
import { Address, User } from "/users/user.types.ts";
import { db } from "/database/mongodb.ts";

const userCollection =  db.collection<User>("users");

export const getAllUsers = async (): Promise<User[]> => {
  return await userCollection.find().toArray();
}

export const getUserById = async (_id: string): Promise<User | undefined> => {
  return await userCollection.findOne({ _id: new ObjectId(_id) });
}

export const userEdit = async (userData: User, _id: string) => {
  return await userCollection.updateOne(
    { _id: {$eq: new ObjectId(_id)}},
    { $set: userData }
  )
}

export const deleteUser = async (_id: string) => {
  await userCollection.deleteOne({ _id: {$eq: new ObjectId(_id)}})
  return {
    message: "delete success"
  }
}

export const userAddress = async (address: Address, _id: string) => {
  await userCollection.updateOne(
    { _id: {$eq: new ObjectId(_id)}},
    { $addToSet: {addresses: address}}
  )
  return {
    message: "add new address success"
  }
}