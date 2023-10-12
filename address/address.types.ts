import { ObjectId } from "$mongo/mod.ts";

export interface Address {
  _id: ObjectId;
  reciever: string;
  contact : string;
  streetName: string;
  subdistrict: string;
  city: string;
  postalCode: string;
  description: string;
  coordinate: string;
}