import { ObjectId } from "$mongo/mod.ts";
import { Category } from "/categories/categories.types.ts";
import { User } from "/users/users.types.ts";

export interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  category: Category[];
  image: string[];
  created_at: Date;
  updated_at: Date;
  created_by: User;
  updated_by: User;
}