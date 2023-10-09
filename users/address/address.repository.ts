import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Address, User } from "/users/users.types.ts";

const userCollection =  db.collection<User>("users");

export const getAllUserAddress = async (_id: string): Promise<Address[]> => {
  const data = await userCollection.findOne(
    { _id: new ObjectId(_id) } as unknown as User,
    { projection: {
      addresses: 1
    }}
  )
  return data?.addresses!;
};

export const getAddressById = async (userId: string, addressId: string): Promise<Address | undefined> => {
  const data = await userCollection.findOne(
    { 
      _id: new ObjectId(userId),
      "addresses._id": new ObjectId(addressId),
    } as unknown as User,
    { projection: {"addresses.$": 1}}
  )
  
  return data?.addresses?.[0];
};

export const userAddress = async (address: Address, _id: string): Promise<{message: string}> => {
  const addressId = new ObjectId() as unknown as string;
  address._id = addressId;

  await userCollection.updateOne(
    { _id: new ObjectId(_id)} as unknown as User,
    { $addToSet: {addresses: address}},
  )
  return {
    message: "add new address success"
  }
};

export const userEditAddress = async (address: Address, userId: string, addressId: string): Promise<{message: string}> => {
  address._id = new ObjectId(addressId) as unknown as string;
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
};


export const deleteUserAddress = async (userId: string, addressId: string): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id: new ObjectId(userId),
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
