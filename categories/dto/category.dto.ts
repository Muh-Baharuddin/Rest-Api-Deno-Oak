import { z } from "$zod/mod.ts";

export const categoryValidate = z.object({
  name: z.string().min(2)
})

export type CategoryDto = z.infer<typeof categoryValidate>;