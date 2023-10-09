import { User } from "/users/users.types.ts";
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

export const findByEmail = async(email: string): Promise<User | undefined> => {
  return await userCollection.findOne(
    { email },
    {projection: {email: 1, username: 1, password: 1}}
  );
}

export const findByUsername = async(username: string): Promise<User | undefined> => {
  return await userCollection.findOne(
    { username },
    { projection: {email: 1, username: 1}}
  );
}

export const insertUser = async(userData: User) => {
  return await userCollection.insertOne(userData);
}