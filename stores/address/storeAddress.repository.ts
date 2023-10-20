import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Store } from "/stores/stores.types.ts";
import { Address } from "/users/address/address.types.ts";

const storeCollection =  db.collection<Store>("stores");

export const getStoreAddressById = async (_id: ObjectId): Promise<Address | undefined> => {
  const data = await storeCollection.findOne(
    { _id },
    { projection: { address: 1 }}
  )
  
  return data?.address;
};

export const createStoreAddress = async (address: Address, _id: ObjectId): Promise<{message: string}> => {
  await storeCollection.updateOne(
    { _id },
    { $set: {address}},
  )
  return {
    message: "add new store address success"
  }
};

export const editStoreAddress = async (address: Address, _id: ObjectId): Promise<{message: string}> => {
  await storeCollection.updateOne(
    { _id },
    { $set: { address } }
  )
  return {
    message: "edit store address success"
  }
};


export const deleteStoreAddress = async (_id: ObjectId, addressId: string): Promise<{message: string}> => {
  await storeCollection.updateOne(
    { _id,
      "address._id": addressId,
    } as unknown as Store,
    { $unset: { "address": 1} as unknown as Store}
  )
  return {
    message: "delete store address success"
  }
};
