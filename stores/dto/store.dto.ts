import { z } from "$zod/mod.ts";
import { addressValidate } from "/users/address/dto/address.dto.ts";

export const storeValidate = z.object({
  name: z.string().min(3),
  owner: z.string().min(3),
  address: addressValidate,
  description: z.string().min(3),
});

export type StoreDto = z.infer<typeof storeValidate>;

