import { Context } from "$oak/mod.ts";
import { UserProfile } from "/auth/auth.types.ts";

export interface AppContext extends Context {
  user?: UserProfile;
}