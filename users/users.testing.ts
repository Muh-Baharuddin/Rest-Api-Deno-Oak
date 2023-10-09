import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";
import { getAll, getUserProfile, updateUser } from "/users/users.service.ts";
import { testing } from "$oak/mod.ts";
import { User } from "/users/users.types.ts";
import { deleteUser } from "/users/users.repository.ts";

Deno.test({
  name: "get all user test",
  async fn() {
    const allData = await getAll();
    assert(allData.length > 0);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "get user profile test",
  async fn() {
    const userId = "651420a38aeb8cd78e7d0c0d";
    const userProfile = await getUserProfile(userId);

    assert(userProfile);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "edit user profile test",
  async fn() {
    const userId = "651420a38aeb8cd78e7d0c0d";
    const userData = {
      username: "tri",
      email: "tri@gmail.com",
    } as User;

    const ctx = testing.createMockContext({
      path: "/users/profile",
    });

    const updatedProfile = await updateUser(userData, userId, ctx);
    assert(updatedProfile);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "delete user profile test",
  async fn() {
    const userId = "651420a38aeb8cd78e7d0c0d";

    const deleted = await deleteUser(userId);

    assert(deleted);
    assert(deleted.message === "delete user success");
  }, 
  sanitizeOps: false,
});