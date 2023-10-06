import { MongoClient } from "$mongo/mod.ts";
import { load } from "$dotenv/mod.ts";

const client = new MongoClient();
const env = await load();

await client.connect(
  env["DATABASE_CONNECTION"],
);

// export const db = client.database(env["DATABASE_NAME"]);
export const db = client.database("martchi");

export default client;

