import { decode } from "$djwt/mod.ts";
import { Next } from "$oak/mod.ts";
import { ObjectId } from "$mongo/deps.ts";
import { User } from "../users/users.types.ts";
// import { key } from "/utils/jwt.ts";
import { AppContext } from "/utils/types.ts";
import { LoginPayload } from "/auth/auth.types.ts";

// export const authMiddleware = async (ctx: AppContext, next: Next) => {
//   const token = ctx.request.headers.get("Authorization");
//   console.log("token", token)
//   try {
//     const data = await verify(token?.split(" ")[1]!, key);
//     console.log("data", data)
//     ctx.user = data.user as User;
//   } catch(_err) {
//     console.log("INI ERROR", _err)
//     ctx.response.body = "Forbidden";
//     ctx.throw(403);
//   }
//   await next();
// };

export const authMiddleware = async (ctx: AppContext, next: Next) => {
  const token = ctx.request.headers.get("Authorization");
  let payloadData: LoginPayload;
  try {
    const [_header, payload, _signature] = decode(token?.split(" ")[1]!);
    payloadData = payload as LoginPayload;
  } catch(_err) {
    ctx.throw(403);
  }
  if( payloadData === undefined) {
    ctx.throw(403);
  }
  const _id = new ObjectId(payloadData.user?._id)
  ctx.user = payloadData.user as User;
  ctx.user._id = _id;
  await next();
};