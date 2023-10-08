import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";
import { getAll } from "/users/users.service.ts";

Deno.test({
  name: "get all user test",
  async fn() {
    await getAll();
    const allData = await getAll();
    assert(allData.length > 0);
  }, 
  sanitizeOps: false,
});