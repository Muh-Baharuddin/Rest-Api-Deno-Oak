import { Router } from "$oak/mod.ts";
import { Address } from "/users/users.types.ts";
import { AppContext } from "/utils/types.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { addAddress, deleteAddress, editAddress, getAddressId, getAllAddress } from "/users/address/address.service.ts";
import { validate } from "/middlewares/validate.ts";
import { addressValidate } from "/users/users.validation.ts";

const usersAddressRouter = new Router();

usersAddressRouter
  .get("/", authMiddleware ,async (context: AppContext): Promise<Address[]> => {
    const userid = context?.user?._id!;

    const allData = await getAllAddress(userid, context)
    return context.response.body = allData;
  })
  .get("/:id", authMiddleware, async (context) : Promise<Address> => {
    const userId = (context as AppContext).user?._id;
    const addressId = context?.params?.id;
    const userAddress = await getAddressId(userId!, addressId, context);
    return context.response.body = userAddress;
  })
  .post("/", authMiddleware, validate(addressValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const address: Address = await context.request.body().value;
    const userid = context?.user?._id!;
    const newAddress = await addAddress(address, userid, context);
    return context.response.body = newAddress;
  })
  .put("/:id", authMiddleware, validate(addressValidate), async (context) : Promise<{ message: string}> => {
    const address: Address = await context.request.body().value;
    const editedAddress = await editAddress(address, context);
    return context.response.body = editedAddress;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const userId = (context as AppContext).user?._id;
    const addressId = context?.params?.id;
    const deleted = await deleteAddress(userId!, addressId, context);
    return context.response.body = deleted;
  });

export default usersAddressRouter;