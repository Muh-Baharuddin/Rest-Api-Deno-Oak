import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Address, User } from "/users/users.types.ts";

const userCollection =  db.collection<User>("users");

export const getAllUserAddress = async (_id: string): Promise<Address[]> => {
  const data = await userCollection.findOne(
    {_id: new ObjectId(_id)},
  );
  
  return data?.addresses!;
};