import { ObjectId } from "$mongo/mod.ts";

export interface Verification {
  _id: ObjectId;
  email: string,
  verificationCode: string;
  created_at: Date;
  expired_at: Date;
}