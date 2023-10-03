import { Context, RouterContext, State } from "$oak/mod.ts";
import { Address, User } from "./users.types.ts";
import { deleteUser, getAllUsers, getUserById, userAddress, userEdit, userEditAddress } from "./users.repository.ts";
import { AppContext } from "/utils/types.ts";

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

export const editAddress = async (address: Address, context: RouterContext<"/address/:id", { id: string; } & Record<string | number, string | undefined>, State>) => {
  const userId = (context as AppContext).user?._id;
  const addressId = context?.params?.id
  if (userId == undefined) {
    context.throw(401)
  }

  const user = await getUserById(userId)
  if (user == undefined) {
    context.throw(401)
  }

  return await userEditAddress(address, userId, addressId);
}
