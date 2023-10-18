import * as addressRepository from "./address.repository.ts"
import { Address } from "./address.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { AddressDto } from "./dto/address.dto.ts";
import { AppContext } from "/utils/types.ts";
import { findUserByid, findUserDataByid } from "/users/users.service.ts";

export const createAddressByDto = (addDto : AddressDto) => {
  const address: Address = {
    _id: new ObjectId(),
    created_at: new Date(),
    updated_at: new Date(),
    ...addDto,
  } ;

  return address;
}

export const getAllAddress = async (userId: ObjectId, context: AppContext): Promise<Address[]> => {
  const user = await findUserByid(userId)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await addressRepository.getAllAddress(userId);
}

export const getAddressId = async (userId: ObjectId, _id: string, context: AppContext): Promise<Address> => {
  const addressId = new ObjectId(_id)
  const user = await findUserByid(userId);
  if (user === undefined) {
    context.throw(401);
  }
  const address = await addressRepository.getAddressById(userId, addressId);
  if(address === undefined) {
    context.throw(400, "address not found");
  }
  return address;
}

export const addAddress = async (address: AddressDto, userId: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(userId)

  if (user == undefined) {
    context.throw(401)
  }
  const newAddress = createAddressByDto(address);
  return await addressRepository.addNewAddress(newAddress, userId);
}

export const editAddress = async (address: Address, _id: string, context: AppContext): Promise<{message: string}> => {
  const addressId = new ObjectId(_id);
  const userId = context.user?._id;
  if (userId == undefined) {
    context.throw(401);
  }

  const user = await findUserDataByid(userId);
  if (user == undefined) {
    context.throw(401);
  }

  const addressData = await addressRepository.getAddressById(userId, addressId);
  if (addressData === undefined) {
    context.throw(401);
  }

  address.created_at = addressData?.created_at!;
  address.updated_at = new Date();
  return await addressRepository.editAddress(address, userId, addressId);
}

export const deleteAddress = async (userId: ObjectId, addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(userId);

  if (user == undefined) {
    context.throw(401);
  }
  return addressRepository.deleteAddress(userId, addressId)
}