import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";
import { Address } from "./address.types.ts";

const userCollection =  db.collection<User>("users");

export const getAllAddress = async (_id: ObjectId): Promise<Address[]> => {
  const data = await userCollection.findOne(
    { _id },
    { projection: {
      addresses: 1
    }}
  )
  return data?.addresses!;
};

export const getAddressById = async (_id: ObjectId, addressId: ObjectId): Promise<Address | undefined> => {
  const data = await userCollection.findOne(
    { 
      _id,
      "addresses._id": new ObjectId(addressId),
    } as unknown as User,
    { projection: {"addresses.$": 1}}
  )
  
  return data?.addresses?.[0];
};

export const addNewAddress = async (address: Address, _id: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id },
    { $addToSet: {addresses: address}},
  )
  return {
    message: "add new address success"
  }
};

export const editAddress = async (address: Address, _id: ObjectId, addressId: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
    { 
      _id,
      'addresses._id': new ObjectId(addressId)
    } as unknown as User,
    { $set: {"addresses.$": address} }
  )
  return {
    message: "edit address success"
  }
};


export const deleteAddress = async (_id: ObjectId, addressId: string): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id,
      "addresses._id": new ObjectId(addressId),
    } as unknown as User,
    {$pull: {
      "addresses": {
        "_id": new ObjectId(addressId)
      }
    }}
  )
  return {
    message: "delete address success"
  }
};
