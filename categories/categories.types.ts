import { ObjectId } from "$mongo/mod.ts";

export interface Category {
  _id: ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}