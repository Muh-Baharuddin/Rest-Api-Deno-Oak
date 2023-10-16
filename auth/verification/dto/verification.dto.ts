import { z } from "$zod/mod.ts";

// export const verificationValidate = z.object({
//   email: z.string().email()
// })

export const verificationValidate = z.object({
  email: z.string().email(),
})

export type VerificationDto = z.infer<typeof verificationValidate>;