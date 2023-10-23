import { Router } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { Address } from "./address.types.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { addAddress, deleteAddress, editAddress, getAddressId, getAllAddress } from "./address.service.ts";
import { validate } from "/middlewares/validate.ts";
import { AddressDto, addressValidate } from "./dto/address.dto.ts";

const usersAddressRouter = new Router();

usersAddressRouter
  .get("/", authMiddleware ,async (context: AppContext): Promise<Address[]> => {
    const userid = context?.user?._id!;
    const allData = await getAllAddress(userid)
    return context.response.body = allData;
  })
  .get("/:id", authMiddleware, async (context) : Promise<Address> => {
    const addressId = context?.params?.id;
    const userAddress = await getAddressId(addressId, context);
    return context.response.body = userAddress;
  })
  .post("/", authMiddleware, validate(addressValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const address: AddressDto = await context.request.body().value;
    const userid = context?.user?._id!;
    const newAddress = await addAddress(address, userid, context);
    return context.response.body = newAddress;
  })
  .put("/:id", authMiddleware, validate(addressValidate), async (context) : Promise<{ message: string}> => {
    const address: Address = await context.request.body().value;
    const addressId = context?.params?.id
    const editedAddress = await editAddress(address, addressId, context);
    return context.response.body = editedAddress;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const userId = (context as AppContext).user?._id!;
    const addressId = context?.params?.id;
    const deleted = await deleteAddress(userId, addressId, context);
    return context.response.body = deleted;
  });

export default usersAddressRouter;