import { ObjectId } from "$mongo/mod.ts";
import { Person } from "../users/person/person.types.ts";
import { Address } from "/users/address/address.types.ts";

export interface Store {
  _id: ObjectId;
  name: string;
  owner: string;
  address: Address;
  description: string;
  created_at: Date;
  updated_at: Date;
  created_by: Person;
  updated_by: Person;
}
