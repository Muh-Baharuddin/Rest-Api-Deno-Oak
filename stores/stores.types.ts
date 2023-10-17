import { ObjectId } from "$mongo/mod.ts";
import { Person } from "../users/person/person.types.ts";
import { Address } from "/users/address/address.types.ts";

export interface Store {
  _id: ObjectId;
  name: string;
  owner?: string;
  person?: Person;
  address: Address;
  description: string;
}
