import { Context } from "$oak/mod.ts";
import { User } from "./users.types.ts";
import * as userRepository from "./users.repository.ts";
import { ObjectId } from "$mongo/mod.ts";

export const getAllUser = async (): Promise<User[]> => {
  return await userRepository.getAllUsers();
}

export const findUserByid = async (id: ObjectId): Promise<User | undefined> => {
  return await userRepository.findUserById(id);
}

export const findUserDataByid = async (id: ObjectId): Promise<User | undefined> => {
  return await userRepository.findUserDataById(id);
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await userRepository.findUserByEmail(email);
}

export const findUserByUsername = async (username: string): Promise<User | undefined> => {
  return await userRepository.findUserByUsername(username);
}

export const insertUser = async (user: User) => {
  return await userRepository.insertUser(user);
}

export const updateUser = async (userData: User, _id: ObjectId, context: Context): Promise<{message: string}> => {
  const user = await userRepository.findUserById(_id)
  
  if (user == undefined) {
    context.throw(401)
  }

  userData.updated_at = new Date();
  return userRepository.userEdit(userData, _id);
}

export const removeUser = async (_id: ObjectId, context: Context): Promise<{message: string}> => {
  const user = await userRepository.findUserById(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await userRepository.deleteUser(_id)
}
