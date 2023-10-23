import * as addressRepository from "./storeAddress.repository.ts"
import { ObjectId } from "$mongo/mod.ts";
import { AppContext } from "/utils/types.ts";
import { Address } from "/users/address/address.types.ts";
import { AddressDto } from "/users/address/dto/address.dto.ts";
import { createAddressByDto } from "/users/address/address.service.ts";
import { findStoreById } from "/stores/stores.service.ts";

export const getStoreAddressById = async (storeId: string, context: AppContext): Promise<Address> => {
  const user = context.user;
  if (user === undefined) {
    context.throw(401);
  }

  const store = await findStoreById(storeId, context)
  if (store == undefined) {
    context.throw(401)
  }

  const address = await addressRepository.getStoreAddressById(store._id);
  if(address === undefined) {
    context.throw(400, "address not found");
  }
  return address;
}

export const addAddress = async (address: AddressDto, storeId: string, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }
  
  const store = await findStoreById(storeId, context)
  if (store == undefined) {
    context.throw(400, "store not found")
  }
  const newAddress = createAddressByDto(address, user);
  return await addressRepository.createStoreAddress(newAddress, store._id);
}

export const editStoreAddress = async (address: Address, _id: string, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }

  const store = await findStoreById(_id, context)
  if (store == undefined) {
    context.throw(400, "store not found")
  }

  const addressData = await addressRepository.getStoreAddressById(store._id);
  if (addressData !== undefined) {
    address._id = addressData._id;
    address.created_at = addressData.created_at;
    address.updated_at = new Date();
    address.created_by = addressData.created_by;
    address.updated_by = addressData.updated_by;
  } else {
    address._id = new ObjectId();
    address.created_at = new Date();
    address.updated_at = new Date();
    address.created_by = user;
    address.updated_by = user;
  }

  return await addressRepository.editStoreAddress(address, store._id);
}

export const deleteStoreAddress = async (addressId: string, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }

  await getStoreAddressById(addressId, context)
  return addressRepository.deleteStoreAddress(user._id, addressId)
}
