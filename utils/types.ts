import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UserProfile } from "../auth/auth.types.ts";

export interface AppContext extends Context {
  user?: UserProfile;
}