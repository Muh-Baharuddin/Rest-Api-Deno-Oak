import { Context } from "$oak/mod.ts";
import { Address, User } from "/users/user.types.ts";
import { deleteUser, getAllUsers, getUserById, userAddress, userEdit } from "./users.repository.ts";

export const getAll = async (): Promise<User[]> => {
  return await getAllUsers();
}

export const getUserProfile = async (_id: string): Promise<User | undefined> => {
  return await getUserById(_id);
}

export const edit = async (userData: User, _id: string, context: Context) => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await userEdit(userData, _id);
}

export const removeUser = async (_id: string, context: Context) => {
  const user = await getUserById(_id)
  console.log("user",user)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await deleteUser(_id)
}

export const addAddress = async (address: Address, _id: string, context: Context) => {
  const user = await getUserById(_id)

  if (user == undefined) {
    context.throw(401)
  }
  return await userAddress(address, _id);
}