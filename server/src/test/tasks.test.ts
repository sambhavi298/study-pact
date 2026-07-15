import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../app";

async function registerAndLogin(email: string) {
  await request(app).post("/auth/register").send({
    email,
    name: "Test User",
    password: "supersecret123",
  });
  const res = await request(app).post("/auth/login").send({
    email,
    password: "supersecret123",
  });
  return res.body.data.token as string;
}

describe("Tasks", () => {
  let ownerToken: string;
  let otherToken: string;

  beforeEach(async () => {
    ownerToken = await registerAndLogin("owner@studypact.com");
    otherToken = await registerAndLogin("other@studypact.com");
  });

  it("creates a task for the authenticated user", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Finish reading", priority: "HIGH" });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Finish reading");
    expect(res.body.data.completed).toBe(false);
  });

  it("rejects task creation with no token", async () => {
    const res = await request(app).post("/tasks").send({ title: "Nope" });
    expect(res.status).toBe(401);
  });

  it("only returns the requesting user's own tasks in the list", async () => {
    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Owner's task" });

    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ title: "Other's task" });

    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe("Owner's task");
  });

  it("blocks a different user from reading another user's task (404, not 403)", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Private task" });
    const taskId = createRes.body.data.id;

    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherToken}`);

    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe("Task not found");
  });

  it("blocks a different user from updating another user's task", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Private task" });
    const taskId = createRes.body.data.id;

    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ completed: true });

    expect(res.status).toBe(404);
  });

  it("blocks a different user from deleting another user's task", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Private task" });
    const taskId = createRes.body.data.id;

    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherToken}`);

    expect(res.status).toBe(404);
  });

  it("allows the owner to update their own task", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "My task" });
    const taskId = createRes.body.data.id;

    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });
});
