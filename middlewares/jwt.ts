import { decode, verify } from "$djwt/mod.ts";
import { Next } from "$oak/mod.ts";
import { User } from "../users/users.types.ts";
import { key } from "/utils/jwt.ts";
import { AppContext } from "/utils/types.ts";

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
  try {
    const [_header, payload, _signature] = decode(token?.split(" ")[1]!);
    const userPayload = payload as AppContext
    ctx.user = userPayload.user as User;
  } catch(_err) {
    ctx.response.body = "Forbidden";
    ctx.throw(403);
  }
  await next();
};

// export const authMiddleware = async (ctx: AppContext, next: Next) => {
//   try {
//     const authorization  = ctx.request.headers.get("Authorization");
//     console.log("authorization", authorization )
    
//     if(!authorization) {
//       ctx.throw(401);
//     }
//     const token  = authorization.split(' ')[1];
    
//     if(!token) {
//       ctx.throw(401);
//     }

//     const payload = await verify(token, key);
//     console.log("payload", payload)
//     if(!payload){
//       throw new Error("!payload")
//     }
//     ctx.user = payload.user as User;
//   } catch(_err) {
//     console.log("INI ERROR", _err)
//     ctx.response.body = "Forbidden";
//     ctx.throw(403);
//   }
//   await next();
// };