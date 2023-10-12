import { AppContext } from "/utils/types.ts";
import { deleteUserAddress, getAddressById, getAllUserAddress, userAddress, userEditAddress } from "./address.repository.ts";
import { RouterContext, State } from "$oak/mod.ts";
import { Address } from "/address/address.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { AddressDto } from "/address/dto/address.dto.ts";
import { findByid } from "/users/users.service.ts";


export const createAddressByDto = (addDto : AddressDto) => {
  const address: Address = {
    _id: new ObjectId(),
    ...addDto,
  } ;

  return address;
}

export const getAllAddress = async (_id: ObjectId, context: AppContext): Promise<Address[]> => {
  const user = await findByid(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return getAllUserAddress(_id);
}

export const getAddressId = async (userId: ObjectId, addressId: string, context: AppContext): Promise<Address> => {
  const user = await findByid(userId);
  
  if (user == undefined) {
    context.throw(401);
  }

  const data = await getAddressById(userId, addressId);

  if( data === undefined) {
    context.throw(400, "address not found");
  }
  return data;
}

export const addAddress = async (address: Address, _id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findByid(_id)

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

  const user = await findByid(userId)
  if (user == undefined) {
    context.throw(401)
  }

  return await userEditAddress(address, userId, addressId);
}

export const deleteAddress = async (userId: ObjectId, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await findByid(userId);

  if (user == undefined) {
    context.throw(401);
  }
  return deleteUserAddress(userId, addressId)
}