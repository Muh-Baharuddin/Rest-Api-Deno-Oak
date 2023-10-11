import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { getAll, getUserProfile, removeUser, updateUser } from "./users.service.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { AppContext } from "/utils/types.ts";
import { userValidate } from "/users/users.validation.ts";
import { User } from "./users.types.ts";
import usersAddressRouter from "/users/address/address.controller.ts";

const usersRouter = new Router();

usersRouter.use("/address", usersAddressRouter.routes(), usersAddressRouter.allowedMethods());

usersRouter
  .get("/", authMiddleware ,async (context): Promise<User[]> => {
    const allData = await getAll()
    return context.response.body = allData;
  })
  .get("/profile", authMiddleware ,async (context: AppContext): Promise<User | undefined> => {
    const userid = context?.user?._id!;
    const userProfile = await getUserProfile(userid)
    return context.response.body = userProfile;
  })
  .put("/profile", authMiddleware, validate(userValidate), async(context: AppContext): Promise<{message: string}> => {
    const userid = context?.user?._id!;
    const userData: User = await context.request.body().value;
    const updateData = await updateUser(userData, userid, context);
    return context.response.body = updateData;
  })
  .delete("/profile", authMiddleware, async(context: AppContext) : Promise<{ message: string}> => {
    const userid = context?.user?._id!;
    const deleted = await removeUser(userid, context);
    return context.response.body = deleted;
  });

export default usersRouter;