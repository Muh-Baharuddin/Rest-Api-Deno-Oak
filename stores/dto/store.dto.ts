import { z } from "$zod/mod.ts";

export const storeValidate = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});

export type StoreDto = z.infer<typeof storeValidate>;

