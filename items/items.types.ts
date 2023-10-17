import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

export type PartialUser = Partial<User>;

interface Category {
  _id: ObjectId;
  name: string;
}

export interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  category: Category[];
  user: PartialUser;
  created_at: Date;
  updated_at: Date;
}