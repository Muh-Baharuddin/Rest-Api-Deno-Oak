import { Router } from "$oak/mod.ts";
import { validate } from "/middlewares/validate.ts";
import { edit, getAll, getUserProfile, removeUser } from "./users.service.ts";
import { UserProfile } from "/auth/auth.types.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { AppContext } from "/utils/types.ts";
import { userValidate } from "/users/users.validation.ts";

const usersRouter = new Router();

usersRouter
  .get("/", authMiddleware ,async (context): Promise<UserProfile[]> => {
    const allData = await getAll()
    return context.response.body = allData;
  })
  .get("/profile", authMiddleware ,async (context: AppContext): Promise<UserProfile | undefined> => {
    const userid = context?.user?._id!;

    const userProfile = await getUserProfile(userid)
    return context.response.body = userProfile;
  })
  .put("/profile", authMiddleware, validate(userValidate), async(context: AppContext) => {
    const userid = context?.user?._id!;

    const userData: UserProfile = await context.request.body().value;

    const updateData = await edit(userData, userid, context);

    return context.response.body = updateData;
  })
  .delete("/profile", authMiddleware, async(context: AppContext) => {
    const userid = context?.user?._id!;
    const deleted = await removeUser(userid, context);

    return context.response.body = deleted;
  })

export default usersRouter;