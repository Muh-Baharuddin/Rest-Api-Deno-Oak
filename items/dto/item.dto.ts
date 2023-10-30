import { z } from "$zod/mod.ts";

export const itemValidate = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: z.array(z.string().min(2)),
  image: z.array(z.string().url()).min(1),
})

export type ItemDto = z.infer<typeof itemValidate>;
