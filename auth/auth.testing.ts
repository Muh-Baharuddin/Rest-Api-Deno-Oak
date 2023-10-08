import { login } from "/auth/auth.service.ts";
import { testing } from "$oak/mod.ts";
import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";

Deno.test({
  name: "Login test",
  async fn() {
    const userData = {
      email: "test3@gmail.com",
      password: "123456",
    };
    const ctx = testing.createMockContext({
      path: "/auth/login",
    });

    const { token, refreshToken } = await login(userData, ctx);
    assert(token);
    assert(refreshToken);
  }, 
  sanitizeOps: false,
});
