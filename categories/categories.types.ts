import { ObjectId } from "$mongo/mod.ts";
import { Person } from "/users/person/person.types.ts";

export interface Category {
  _id: ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
  created_by: Person;
  updated_by: Person;
}