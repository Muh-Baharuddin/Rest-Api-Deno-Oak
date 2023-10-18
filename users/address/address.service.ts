import * as addressRepository from "./address.repository.ts"
import { Address } from "./address.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { AddressDto } from "./dto/address.dto.ts";
import { AppContext } from "/utils/types.ts";
import { findUserByid } from "/users/users.service.ts";
import { RouterContext, State } from "$oak/mod.ts";

export const createAddressByDto = (addDto : AddressDto) => {
  const address: Address = {
    _id: new ObjectId(),
    created_at: new Date(),
    updated_at: new Date(),
    ...addDto,
  } ;

  return address;
}

export const getAllAddress = async (_id: ObjectId, context: AppContext): Promise<Address[]> => {
  const user = await findUserByid(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await addressRepository.getAllAddress(_id);
}

export const getAddressId = async (_id: ObjectId, addressId: string, context: AppContext): Promise<Address> => {
  const user = await findUserByid(_id);
  if (user === undefined) {
    context.throw(401);
  }
  const address = await addressRepository.getAddressById(_id, addressId);
  if(address === undefined) {
    context.throw(400, "address not found");
  }
  return address;
}

export const addAddress = async (address: AddressDto, _id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(_id)

  if (user == undefined) {
    context.throw(401)
  }
  const newAddress = createAddressByDto(address);
  return await addressRepository.addNewAddress(newAddress, _id);
}

export const editAddress = async (address: Address, context: RouterContext<"/:id", { id: string; } & Record<string | number, string | undefined>, State>): Promise<{message: string}> => {
  const userId = (context as AppContext).user?._id;
  const addressId = context?.params?.id
  if (userId == undefined) {
    context.throw(401)
  }

  const user = await findUserByid(userId)
  if (user == undefined) {
    context.throw(401)
  }
  address.updated_at = new Date();
  return await addressRepository.editAddress(address, userId, addressId);
}

export const deleteAddress = async (_id: ObjectId, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(_id);

  if (user == undefined) {
    context.throw(401);
  }
  return addressRepository.deleteAddress(_id, addressId)
}