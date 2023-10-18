import { z } from "$zod/mod.ts";
import { categoryValidate } from "/categories/dto/category.dto.ts";

export const itemValidate = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: categoryValidate,
})

export type ItemDto = z.infer<typeof itemValidate>;
