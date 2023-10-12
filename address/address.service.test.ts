import { testing } from "$oak/mod.ts";
import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import { deleteAddress, getAddressId, getAllAddress } from "./address.service.ts";
import { ObjectId } from "$mongo/mod.ts";

Deno.test({
  name: "get all user address test",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/users/address",
    });

    const userId = new ObjectId("6514206d8aeb8cd78e7d0c0c");
    const allAddress = await getAllAddress(userId, ctx);
    assert(allAddress.length > 0);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "get user address by id test",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/users/address",
    });

    const userId = new ObjectId("6514206d8aeb8cd78e7d0c0c");
    const addressId = "6523a3a9a42027d5e8be25bf";

    const AddressById = await getAddressId(userId, addressId, ctx);
    assert(AddressById);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "delete user address test",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/users/address",
    });
    
    const userId = new ObjectId("6514206d8aeb8cd78e7d0c0c");
    const addressId = "6523856b29c18492f5f7eb8f";

    const deleted = await deleteAddress(userId, addressId, ctx);
    assert(deleted);
    assertEquals(deleted.message, "delete address success");
  }, 
  sanitizeOps: false,
});