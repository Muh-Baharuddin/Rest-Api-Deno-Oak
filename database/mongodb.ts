import { MongoClient } from "$mongo/mod.ts";
// import { load } from "$dotenv/mod.ts";

const client = new MongoClient();
// const env = await load();

await client.connect(
  // env["DATABASE_CONNECTION"],
  "mongodb+srv://aldi:12345@testing-indonesia.uassntj.mongodb.net/martchi?authMechanism=SCRAM-SHA-1",
);

// export const db = client.database(env["DATABASE_NAME"]);
export const db = client.database("martchi");

export default client;

