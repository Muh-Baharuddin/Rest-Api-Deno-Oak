import { z } from "$zod/mod.ts";
import { addressValidate } from "/address/dto/address.dto.ts";

export const userValidate = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password:  z.string().min(6),
  addresses: z.optional(addressValidate),
  person: z.optional(addressValidate),
})

export type UserDto = z.infer<typeof userValidate>;
