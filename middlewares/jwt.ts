import { verify } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { Context, Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { key } from "../utils/jwt.ts";

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers.get("Authorization");
  try {
    await verify(token?.split(" ")[1]!, key)
  } catch(_err) {
    ctx.response.body = "Forbidden";
    ctx.throw(403);
  }
  await next();
};