import { MongoClient } from "$mongo/mod.ts";
import { config } from "$dotenv/mod.ts";

config({export: true});

const client = new MongoClient();
// const env = await load();

await client.connect(
  Deno.env.get("DATABASE_CONNECTION")!
);

// export const db = client.database(env["DATABASE_NAME"]);
export const db = client.database(Deno.env.get("DATABASE_NAME")!);

export default client;

