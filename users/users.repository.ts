import { ObjectId } from "$mongo/mod.ts";
import { User } from "./users.types.ts";
import { db } from "/database/mongodb.ts";

const userCollection =  db.collection<User>("users");

userCollection.createIndexes({
  indexes: [
    {
      key: {
        "username": 1,
      },
      name: "username"
    },
    {
      key: {
        "email": 1,
      },
      name: "index_email"
    }
  ]
})

export const getAllUsers = async (): Promise<User[]> => {
  return await userCollection.find(
    {},
    {projection: {
      username: 1,
      email: 1 
    }}
  ).toArray();
}

export const findUserById = async (_id: ObjectId): Promise<User | undefined> => {
  return await userCollection.findOne(
    { _id },
    {projection: {
      username: 1,
      email: 1 
    }}
  );
}

export const findUserByEmail = async(email: string): Promise<User | undefined> => {
  return await userCollection.findOne(
    { email },
    {projection: {email: 1, username: 1, password: 1}}
  );
}

export const findUserByUsername = async(username: string): Promise<User | undefined> => {
  return await userCollection.findOne(
    { username },
    { projection: {email: 1, username: 1}}
  );
}

export const findUserDataById = async(_id: ObjectId): Promise<User | undefined> => {
  return await userCollection.findOne(
    { _id },
    { projection: {email: 1, username: 1, person: 1}}
  );
}

export const insertUser = async(userData: User) => {
  return await userCollection.insertOne(userData);
}

export const userEdit = async (userData: User, _id: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id },
    { $set: userData }
  )
  return {
    message: "edit user success"
  }
}

export const deleteUser = async (_id: ObjectId): Promise<{message: string}> => {
  await userCollection.deleteOne({ _id })
  return {
    message: "delete user success"
  }
}
