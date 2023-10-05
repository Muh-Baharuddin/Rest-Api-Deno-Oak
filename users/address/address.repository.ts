import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Address, User } from "/users/users.types.ts";

const userCollection =  db.collection<User>("users");

export const getAllUserAddress = async (_id: string): Promise<Address[]> => {
  const data = await userCollection.findOne(
    { _id: new ObjectId(_id) },
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

export const deleteUserAddress = async (userId: string, addressId: string) => {
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
}
