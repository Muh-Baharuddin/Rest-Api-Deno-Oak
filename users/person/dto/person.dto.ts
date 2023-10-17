import { z } from "$zod/mod.ts";

export const personValidate = z.object({
  name: z.string().min(3),
  bod: z.string().datetime(),
  phoneNumber: z.string().min(10),
  ktp: z.optional(z.string().min(16)),
  npwp: z.optional(z.string().min(15)),
});

export type PersonDto = z.infer<typeof personValidate>;
