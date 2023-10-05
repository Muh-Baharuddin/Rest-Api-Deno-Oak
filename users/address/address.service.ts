import { AppContext } from "/utils/types.ts";
import { deleteUserAddress, getAddressById, getAllUserAddress } from "/users/address/address.repository.ts";
import { Address } from "/users/users.types.ts";
import { getUserById } from "/users/users.repository.ts";


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

export const deleteAddress = async (userId: string, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await getUserById(userId);

  if (user == undefined) {
    context.throw(401);
  }
  return deleteUserAddress(userId, addressId)
}