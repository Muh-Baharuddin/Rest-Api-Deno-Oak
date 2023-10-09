import { Context } from "$oak/mod.ts";
import { User } from "./users.types.ts";
import { deleteUser, getAllUsers, getUserById, userEdit } from "./users.repository.ts";

export const getAll = async (): Promise<User[]> => {
  return await getAllUsers();
}

export const getUserProfile = async (_id: string): Promise<User | undefined> => {
  return await getUserById(_id);
}

export const updateUser = async (userData: User, _id: string, context: Context): Promise<{message: string}> => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await userEdit(userData, _id);
}

export const removeUser = async (_id: string, context: Context): Promise<{message: string}> => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await deleteUser(_id)
}
