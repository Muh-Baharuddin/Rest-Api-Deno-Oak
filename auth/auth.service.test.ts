import { login, register } from "/auth/auth.service.ts";
import { testing } from "$oak/mod.ts";
import { assert } from "https://deno.land/std@0.200.0/assert/assert.ts";

Deno.test({
  name: "login test",
  async fn() {
    const userData = {
      email: "test7@gmail.com",
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

Deno.test({
  name: "register test",
  async fn() {
    const userData = {
      email: "dimas@gmail.com",
      username: "dimas",
      password: "123456",
      verificationCode: "542951"
    };
    const ctx = testing.createMockContext({
      path: "/auth/register",
    });

    const { token, refreshToken } = await register(userData, ctx);
    assert(token);
    assert(refreshToken);
  }, 
  sanitizeOps: false,
});
