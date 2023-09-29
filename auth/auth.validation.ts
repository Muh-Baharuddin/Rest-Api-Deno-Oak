import { z } from "$zod/mod.ts";

export const userValidateLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const userValidateRegister = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6)
})