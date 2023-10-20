import { ObjectId } from "$mongo/mod.ts";
import { User } from "/users/users.types.ts";

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
  created_at: Date;
  updated_at: Date;
  created_by: User;
  updated_by: User;
}