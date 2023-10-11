import { Store } from "/stores/stores.types.ts";

export interface User {
  _id?: string;
  email: string;
  username: string;
  password: string;
  addresses?: Address[];
  store?: Store;
}

export interface Address {
  _id: string;
  reciever: string;
  contact : string;
  streetName: string;
  subdistrict: string;
  city: string;
  postalCode: string;
  description: string;
  coordinate: string;
}