import { ObjectId } from "$mongo/mod.ts";

export interface Person {
  _id: ObjectId
  name: string;
  bod: Date;
  phoneNumber: string;
  ktp?: string;
  npwp?: string;
}