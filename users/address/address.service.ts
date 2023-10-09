import { AppContext } from "/utils/types.ts";
import { deleteUserAddress, getAddressById, getAllUserAddress, userAddress, userEditAddress } from "/users/address/address.repository.ts";
import { Address } from "/users/users.types.ts";
import { getUserById } from "/users/users.repository.ts";
import { RouterContext, State } from "$oak/mod.ts";


export const getAllAddress = async (_id: string, context: AppContext): Promise<Address[]> => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return getAllUserAddress(_id);
}

export const getAddressId = async (userId: string, addressId: string, context: AppContext): Promise<Address> => {
  const user = await getUserById(userId);
  
  if (user == undefined) {
    context.throw(401);
  }

  const data = await getAddressById(userId, addressId);

  if( data === undefined) {
    context.throw(400, "address not found");
  }
  return data;
}

export const addAddress = async (address: Address, _id: string, context: AppContext): Promise<{message: string}> => {
  const user = await getUserById(_id)

  if (user == undefined) {
    context.throw(401)
  }
  return await userAddress(address, _id);
}

export const editAddress = async (address: Address, context: RouterContext<"/:id", { id: string; } & Record<string | number, string | undefined>, State>): Promise<{message: string}> => {
  const userId = (context as AppContext).user?._id;
  const addressId = context?.params?.id
  if (userId == undefined) {
    context.throw(401)
  }

  const user = await getUserById(userId)
  if (user == undefined) {
    context.throw(401)
  }

  return await userEditAddress(address, userId, addressId);
}

export const deleteAddress = async (userId: string, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await getUserById(userId);

  if (user == undefined) {
    context.throw(401);
  }
  return deleteUserAddress(userId, addressId)
}