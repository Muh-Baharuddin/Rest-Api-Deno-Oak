import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import { deleteUserAddress, getAddressById, getAllUserAddress } from "/users/address/address.repository.ts";

Deno.test({
  name: "get all user address test",
  async fn() {
    const userId = "6514206d8aeb8cd78e7d0c0c";
    const allAddress = await getAllUserAddress(userId);
    assert(allAddress.length > 0);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "get user address by id test",
  async fn() {
    const userId = "6514206d8aeb8cd78e7d0c0c";
    const addressId = "6523856b29c18492f5f7eb8f";

    const AddressById = await getAddressById(userId, addressId);
    assert(AddressById);
  }, 
  sanitizeOps: false,
});

Deno.test({
  name: "delete user address test",
  async fn() {
    const userId = "6514206d8aeb8cd78e7d0c0c";
    const addressId = "6523856b29c18492f5f7eb8f";

    const deleted = await deleteUserAddress(userId, addressId);
    assert(deleted);
    assertEquals(deleted.message, "delete address success");
  }, 
  sanitizeOps: false,
});