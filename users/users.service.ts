import { Context } from "$oak/mod.ts";
import { User } from "./users.types.ts";
import * as userRepository from "./users.repository.ts";
import { ObjectId } from "$mongo/mod.ts";

export const getAll = async (): Promise<User[]> => {
  return await userRepository.getAllUsers();
}

export const findByid = async (id: ObjectId): Promise<User | undefined> => {
  return await userRepository.findById(id);
}

export const findByEmail = async (email: string): Promise<User | undefined> => {
  return await userRepository.findByEmail(email);
}

export const findByUsername = async (username: string): Promise<User | undefined> => {
  return await userRepository.findByEmail(username);
}

export const insertUser = async (user: User) => {
  return await userRepository.insertUser(user);
}

export const updateUser = async (userData: User, _id: ObjectId, context: Context): Promise<{message: string}> => {
  const user = await userRepository.findById(_id)
  
  if (user == undefined) {
    context.throw(401)
  }

  return userRepository.userEdit(userData, _id);
}

export const removeUser = async (_id: ObjectId, context: Context): Promise<{message: string}> => {
  const user = await userRepository.findById(_id)
  
  if (user == undefined) {
    context.response.body = "Unauthorized";
    context.throw(401)
  }
  return await userRepository.deleteUser(_id)
}
