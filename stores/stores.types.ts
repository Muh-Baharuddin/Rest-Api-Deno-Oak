import { ObjectId } from "$mongo/mod.ts";
import { Person } from "../users/person/person.types.ts";
import { User } from "/users/users.types.ts";
import { Address } from "/users/address/address.types.ts";

export interface Store {
  _id: ObjectId;
  name: string;
  owner: Person;
  address?: Address;
  description: string;
  created_at: Date;
  updated_at: Date;
  created_by: User;
  updated_by: User;
}
