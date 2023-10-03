import { ObjectId } from "$mongo/mod.ts";
import { Address, User } from "./users.types.ts";
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
  const addressId = new ObjectId();
  address._id = addressId;

  await userCollection.updateOne(
    { _id: {$eq: new ObjectId(_id)}},
    { $addToSet: {addresses: address}},
  )
  return {
    message: "add new address success"
  }
}

export const userEditAddress = async (address: Address, userId: string, addressId: string) => {
  address._id = addressId;
  await userCollection.updateOne(
    { 
      _id: new ObjectId(userId),
      'addresses._id': new ObjectId(addressId)
    } as unknown as User,
    { $set: {"addresses.$": address} }
  )
  return {
    message: "edit address success"
  }
}
