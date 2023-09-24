import {
  Bson,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const client = new MongoClient();

// await client.connect({
//   db: "martchi",
//   servers: [
//     {
//       host: "testing-indonesia.uassntj.mongodb.net",
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: "aldi",
//     password: "12345",
//     db: "martchi",
//     mechanism: "SCRAM-SHA-1",
//   },
// });

await client.connect(
  "mongodb+srv://aldi:12345@testing-indonesia.uassntj.mongodb.net/martchi?authMechanism=SCRAM-SHA-1",
);

export const db = client.database("martchi");

export default client;