import { Next } from "$oak/mod.ts";
import { ZodRawShape, ZodTypeAny, z } from "$zod/mod.ts";
import { AppContext } from "/utils/types.ts";

export const validate = (vobj: z.ZodObject<ZodRawShape> | z.ZodArray<ZodTypeAny>) => {
  return async (ctx: AppContext, next: Next) => {
    const dataBody = await ctx.request.body().value;

    try {
      vobj.parse(dataBody);
    } catch(err) {
      if (err instanceof z.ZodError) {
        const errors = err.issues.map((error) => {
          return {
            field: error.path[0],
            message: error.message
          }
        });
        const finalObj: Record<string, string> = {};
        for(let i = 0; i < errors.length; i++ ) {
          finalObj[errors[i].field] = errors[i].message
        }
        ctx.throw(400, JSON.stringify(finalObj));
      }
    }
    await next();
  }
}