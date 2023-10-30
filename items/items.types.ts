import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

export interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  category: ObjectId[];
  image: string[];
  created_at: Date;
  updated_at: Date;
  created_by: User;
  updated_by: User;
}