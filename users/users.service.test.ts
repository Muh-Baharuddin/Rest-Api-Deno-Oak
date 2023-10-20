import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";
import { findUserByid, getAllUser, updateUser } from "/users/users.service.ts";
import { testing } from "$oak/mod.ts";
import { User } from "/users/users.types.ts";
import { deleteUser } from "/users/users.repository.ts";
import { ObjectId } from "$mongo/mod.ts";

Deno.test({
  name: "get all user test",
  async fn() {
    const allData = await getAllUser();
    assert(allData.length > 0);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "get user profile test",
  async fn() {
    const userId = new ObjectId("652161ee5092df19d9a1fa9c");
    const userProfile = await findUserByid(userId);

    assert(userProfile);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "edit user profile test",
  async fn() {
    const userId = new ObjectId("652161ee5092df19d9a1fa9c");
    const userData = {
      username: "yunyuu",
      email: "yunyu@gmail.com",
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
    const userId = new ObjectId("652161ee5092df19d9a1fa9c");

    const deleted = await deleteUser(userId);

    assert(deleted);
    assert(deleted.message === "delete user success");
  }, 
  sanitizeOps: false,
});