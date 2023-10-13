import { z } from "$zod/mod.ts";
import { personValidate } from "/person/dto/person.dto.ts";
import { addressValidate } from "/users/address/dto/address.dto.ts";

export const storeValidate = z.object({
  name: z.string().min(3),
  address: addressValidate,
  description: z.string().min(3),
  owner: z.optional(z.string().min(3)),
  person: z.optional(personValidate),
});

export type StoreDto = z.infer<typeof storeValidate>;

