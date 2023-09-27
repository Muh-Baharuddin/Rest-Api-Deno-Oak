import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";
import { edit, getAll, getUserProfile } from "./users.service.ts";
import { UserProfile } from "../auth/auth.types.ts";
import { authMiddleware } from "../middlewares/jwt.ts";
import { AppContext } from "../utils/types.ts";

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
  .put("/profile", authMiddleware, async(context: AppContext) => {

    const userValidate = z.object({
      email: z.string().email(),
      username: z.string().min(3),
    })

    const userid = context?.user?._id!;

    const userData: UserProfile = await context.request.body().value;
    userValidate.parse(userData);

    const updateData = await edit(userData, userid, context);

    return context.response.body = updateData;
  })

export default usersRouter;