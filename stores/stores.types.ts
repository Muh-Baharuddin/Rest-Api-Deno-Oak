import { ObjectId } from "$mongo/mod.ts";
import { Person } from "/person/person.types.ts";
import { Address } from "/address/address.types.ts";

export interface Store {
  _id: ObjectId;
  name: string;
  owner?: string;
  person?: Person;
  address: Address;
  description: string;
}
