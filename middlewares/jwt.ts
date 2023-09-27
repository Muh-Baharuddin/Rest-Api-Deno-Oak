import { verify } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { key } from "../utils/jwt.ts";
import { AppContext } from "../utils/types.ts";
import { UserProfile } from "../auth/auth.types.ts";

export const authMiddleware = async (ctx: AppContext, next: Next) => {
  const token = ctx.request.headers.get("Authorization");
  try {
    const data = await verify(token?.split(" ")[1]!, key);
    ctx.user = data.user as UserProfile;
  } catch(_err) {
    ctx.response.body = "Forbidden";
    ctx.throw(403);
  }
  await next();
};