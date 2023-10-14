import { SMTPClient } from "$denomailer/mod.ts";
import { config } from "$dotenv/mod.ts";

config({export: true});
export const client  = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com",
    port: 465,
    tls: true,
    auth: {
      username: Deno.env.get("MAILER_USERNAME")!,
      password: Deno.env.get("MAILER_PASSWORD")!,
    },
  },
})
