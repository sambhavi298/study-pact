import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";

describe("Auth", () => {
  describe("POST /auth/register", () => {
    it("creates a user and never returns the password", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "test@studypact.com",
        name: "Test User",
        password: "supersecret123",
      });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe("test@studypact.com");
      expect(res.body.data.password).toBeUndefined();
    });

    it("rejects a duplicate email with 409", async () => {
      await request(app).post("/auth/register").send({
        email: "dupe@studypact.com",
        name: "First",
        password: "supersecret123",
      });

      const res = await request(app).post("/auth/register").send({
        email: "dupe@studypact.com",
        name: "Second",
        password: "differentpass456",
      });

      expect(res.status).toBe(409);
      expect(res.body.error.message).toBe("Email already in use");
    });

    it("rejects invalid input with 400", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "not-an-email",
        name: "",
        password: "short",
      });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("POST /auth/login", () => {
    async function registerTestUser() {
      await request(app).post("/auth/register").send({
        email: "login-test@studypact.com",
        name: "Login Test",
        password: "correctpassword",
      });
    }

    it("returns a token for correct credentials", async () => {
      await registerTestUser();

      const res = await request(app).post("/auth/login").send({
        email: "login-test@studypact.com",
        password: "correctpassword",
      });

      expect(res.status).toBe(200);
      expect(typeof res.body.data.token).toBe("string");
    });

    it("returns the identical error for wrong password and nonexistent email", async () => {
      await registerTestUser();

      const wrongPassword = await request(app).post("/auth/login").send({
        email: "login-test@studypact.com",
        password: "wrongpassword",
      });

      const noSuchUser = await request(app).post("/auth/login").send({
        email: "doesnotexist@studypact.com",
        password: "whatever123",
      });

      expect(wrongPassword.status).toBe(401);
      expect(noSuchUser.status).toBe(401);
      expect(wrongPassword.body.error.message).toBe(noSuchUser.body.error.message);
    });
  });

  describe("GET /users/me", () => {
    it("rejects requests with no token", async () => {
      const res = await request(app).get("/users/me");
      expect(res.status).toBe(401);
    });

    it("returns the current user for a valid token", async () => {
      await request(app).post("/auth/register").send({
        email: "me-test@studypact.com",
        name: "Me Test",
        password: "supersecret123",
      });

      const loginRes = await request(app).post("/auth/login").send({
        email: "me-test@studypact.com",
        password: "supersecret123",
      });
      const token = loginRes.body.data.token;

      const res = await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe("me-test@studypact.com");
    });
  });
});
