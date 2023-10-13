import { Person } from "/person/person.types.ts";
import { Address } from "./address/address.types.ts";
import { ObjectId } from "$mongo/mod.ts";

export interface User {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  addresses?: Address[];
  person?: Person;
}
