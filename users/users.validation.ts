import { z } from "$zod/mod.ts";

export const userValidate = z.object({
  email: z.string().email(),
  username: z.string().min(3),
})