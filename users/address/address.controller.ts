import { Router } from "$oak/mod.ts";
import { Address } from "/users/users.types.ts";
import { AppContext } from "/utils/types.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { getAllAddress } from "/users/address/address.service.ts";

const usersAddressRouter = new Router();

usersAddressRouter
  .get("/", authMiddleware ,async (context: AppContext): Promise<Address[]> => {
    const userid = context?.user?._id!;

    const allData = await getAllAddress(userid, context)
    return context.response.body = allData;
  })

export default usersAddressRouter;