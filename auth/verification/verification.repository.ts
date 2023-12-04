import { db } from "/database/mongodb.ts";
import { Verification } from "/auth/verification/verification.types.ts";


const verificationCollection =  db.collection<Verification>("verification");

verificationCollection.createIndexes({
  indexes: [
    {
      key: {
        "email": 1,
      },
      name: "index_email"
    }
  ]
})

export const insertVerif = async (verifData: Verification) => {
  await verificationCollection.insertOne(verifData);

  return verifData;
}

export const findCode = async (email: string, verificationCode: string) => {
  const find = await verificationCollection.findOne(
    { 
      email,
      verificationCode
    }
  )
  return find;
}