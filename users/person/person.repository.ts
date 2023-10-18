import { User } from "/users/users.types.ts";
import { db } from "/database/mongodb.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Person } from "/users/person/person.types.ts";

const userCollection =  db.collection<User>("users");

export const getUserPerson = async (_id: ObjectId): Promise<Person> => {
  const data = await userCollection.findOne(
    { _id },
    { projection: {
      person: 1
    }}
  )
  return data?.person!;
};

export const addNewPerson = async (person: Person, _id: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
      { _id },
      { $set: { person }},
    )
  return {
    message: "add person success"
  }
};

export const editPerson = async (person: Person, _id: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
      { _id },
      { $set: { person }},
    )
  return {
    message: "edit person success"
  }
};

export const deletePerson = async (_id: ObjectId): Promise<{message: string}> => {
  await userCollection.updateOne(
    { _id },
    { $unset: { "person": 1} as unknown as User}
  )
  return {
    message: "delete person success"
  }
};