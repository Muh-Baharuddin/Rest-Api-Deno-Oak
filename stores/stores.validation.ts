import { z } from "$zod/mod.ts";
import { addressValidate } from "/users/users.validation.ts";

export const personValidate = z.object({
  name: z.string().min(3),
  bod: z.string().datetime(),
  phoneNumber: z.string().min(10),
  ktp: z.optional(z.string().min(16)),
  npwp: z.optional(z.string().min(15)),
});

export const storeValidate = z.object({
  name: z.string().min(3),
  owner: z.optional(z.string().min(3)),
  person: z.optional(personValidate),
  address: addressValidate,
  description: z.string().min(3),
});