import { Router } from "$oak/mod.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { addAddress, deleteStoreAddress, editStoreAddress, getStoreAddressById } from "./storeAddress.service.ts";
import { validate } from "/middlewares/validate.ts";
import { Address } from "/users/address/address.types.ts";
import { AddressDto, addressValidate } from "/users/address/dto/address.dto.ts";

const storeAddressRouter = new Router();

storeAddressRouter
  .get("/:id", authMiddleware, async (context) : Promise<Address> => {
    const storeId = context?.params?.id;
    console.log("storeId", storeId)
    const userAddress = await getStoreAddressById(storeId, context);
    return context.response.body = userAddress;
  })
  .post("/:id", authMiddleware, validate(addressValidate), async (context) : Promise<{ message: string}> => {
    const address: AddressDto = await context.request.body().value;
    const storeId = context.params.id;
    const newAddress = await addAddress(address, storeId, context);
    return context.response.body = newAddress;
  })
  .put("/:id", authMiddleware, validate(addressValidate), async (context) : Promise<{ message: string}> => {
    const address: Address = await context.request.body().value;
    const storeId = context?.params?.id
    const editedAddress = await editStoreAddress(address, storeId, context);
    return context.response.body = editedAddress;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const storeId = context?.params?.id;
    const deleted = await deleteStoreAddress(storeId, context);
    return context.response.body = deleted;
  });

export default storeAddressRouter;