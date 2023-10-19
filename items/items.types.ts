import { ObjectId } from "$mongo/mod.ts";
import { Person } from "/users/person/person.types.ts";
import { Category } from "/categories/categories.types.ts";

export interface Item {
  _id: ObjectId;
  name: string;
  price: number;
  category: Category[];
  created_at: Date;
  updated_at: Date;
  created_by: Person;
  updated_by: Person;
}