import * as addressRepository from "./address.repository.ts"
import { Address } from "./address.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { AddressDto } from "./dto/address.dto.ts";
import { AppContext } from "/utils/types.ts";
import { findUserByid } from "/users/users.service.ts";
import { User } from "/users/users.types.ts";

export const getAllAddress = async (userId: ObjectId): Promise<Address[]> => {
  return await addressRepository.getAllAddress(userId);
}

export const getAddressId = async (_id: string, context: AppContext): Promise<Address> => {
  const addressId = new ObjectId(_id)
  const userId = context.user?._id!;
  
  const address = await addressRepository.getAddressById(userId, addressId);
  if(address === undefined) {
    context.throw(400, "address not found");
  }
  return address;
}

export const addAddress = async (address: AddressDto, userId: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }
  const newAddress = createAddressByDto(address, user);
  return await addressRepository.addNewAddress(newAddress, userId);
}

export const editAddress = async (address: Address, _id: string, context: AppContext): Promise<{message: string}> => {
  const addressId = new ObjectId(_id);
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }

  const addressData = await addressRepository.getAddressById(user._id, addressId);
  if (addressData === undefined) {
    context.throw(401);
  }

  const updatedAddress = updateAddressData(address, addressData, user)
  return await addressRepository.editAddress(updatedAddress, user._id, addressId);
}

export const deleteAddress = async (userId: ObjectId, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(userId);

  if (user == undefined) {
    context.throw(401);
  }
  return addressRepository.deleteAddress(userId, addressId)
}

export const createAddressByDto = (addDto : AddressDto, user: User) => {
  const address: Address = {
    _id: new ObjectId(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user,
    updated_by: user,
    ...addDto,
  } ;
  return address;
}

export const updateAddressData = (address : Address, previousAddress: Address, user: User) => {
  const updatedAddress: Address = {
    ...address,
    _id: previousAddress._id,
    created_at: previousAddress.created_at,
    updated_at: new Date(),
    created_by: previousAddress.created_by,
    updated_by: user,
  } ;
  return updatedAddress;
}