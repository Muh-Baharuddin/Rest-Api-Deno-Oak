import { ObjectId } from "$mongo/mod.ts";
// import { Category } from "/categories/categories.types.ts";
import { User } from "/users/users.types.ts";

export type PartialUser = Partial<User>;

export interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  category: string;
  user: PartialUser;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}