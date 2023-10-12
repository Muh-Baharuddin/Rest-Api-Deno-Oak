import { z } from "$zod/mod.ts";

export const loginValidate = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const registerValidate = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password:  z.string().min(6),
})

export type LoginDto = z.infer<typeof loginValidate>;
export type RegisterDto = z.infer<typeof registerValidate>;