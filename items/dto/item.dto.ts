import { z } from "$zod/mod.ts";

export const categoryValidate = z.array(
  z.object({
    name: z.string().min(2)
  })
)
export const itemValidate = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: categoryValidate,
})

export type ItemDto = z.infer<typeof itemValidate>;
export type categoryDto = z.infer<typeof categoryValidate>;