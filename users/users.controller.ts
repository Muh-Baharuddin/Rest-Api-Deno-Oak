import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";
import { edit, getAll } from "./users.service.ts";
import { UserProfile } from "../auth/auth.types.ts";

const usersRouter = new Router();

usersRouter
  .get("/", async (context): Promise<UserProfile[]> => {
    const allData = await getAll()
    return context.response.body = allData;
  })
  .put("/:id", async(context) => {
    const userValidate = z.object({
      email: z.string().email(),
      username: z.string().min(3),
      password: z.string().min(6)
    })
    const userid = context?.params?.id;
    const userData: UserProfile = await context.request.body().value;
    userValidate.parse(userData);
    const updateData = await edit(userData, userid, context);
    return context.response.body = updateData;
  })

export default usersRouter;