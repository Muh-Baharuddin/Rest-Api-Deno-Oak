import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

export interface Category {
  _id: ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
  created_by: User;
  updated_by: User;
}