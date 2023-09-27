import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UserProfile } from "../auth/auth.types.ts";
import { getAllUsers, getUserById, userEdit } from "./users.repository.ts";

export const getAll = async (): Promise<UserProfile[]> => {
  return await getAllUsers();
}

export const getUserProfile = async (_id: string): Promise<UserProfile | undefined> => {
  return await getUserById(_id);
}

export const edit = async (userData: UserProfile, _id: string, context: Context) => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await userEdit(userData, _id);
}