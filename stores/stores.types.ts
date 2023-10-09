import { Address } from "/users/users.types.ts";

export interface Store {
  _id?: string;
  name: string;
  owner?: string;
  person?: Person;
  address: Address;
  description: string;
}

export interface Person {
  _id?: string;
  name: string;
  bod: Date;
  phoneNumber: string;
  ktp?: string;
  npwp?: string;
}