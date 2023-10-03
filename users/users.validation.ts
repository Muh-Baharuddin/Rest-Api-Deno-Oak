import { z } from "$zod/mod.ts";

export const userValidate = z.object({
  email: z.string().email(),
  username: z.string().min(3),
})

export const addressValidate = z.object({
  reciever: z.string().min(3),
  contact: z.string().min(10),
  streetName: z.string().min(3),
  subdistrict: z.string().min(3),
  city: z.string().min(3),
  postalCode: z.string().min(6),
  description: z.string().min(3),
  coordinate: z.string().min(3),
});