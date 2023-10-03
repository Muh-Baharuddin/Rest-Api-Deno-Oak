import { Context } from "$oak/mod.ts";
import { User } from "/users/users.types.ts";

export interface AppContext extends Context {
  user?: User;
}