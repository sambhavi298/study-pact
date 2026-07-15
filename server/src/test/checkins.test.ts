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

describe("Check-ins", () => {
  let ownerToken: string;
  let otherToken: string;

  beforeEach(async () => {
    ownerToken = await registerAndLogin("checkin-owner@studypact.com");
    otherToken = await registerAndLogin("checkin-other@studypact.com");
  });

  it("creates today's check-in", async () => {
    const res = await request(app)
      .post("/checkins")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 2.5, notes: "Reviewed notes" });

    expect(res.status).toBe(201);
    expect(res.body.data.studyHours).toBe(2.5);
  });

  it("blocks a second check-in on the same day", async () => {
    await request(app)
      .post("/checkins")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 2.5 });

    const res = await request(app)
      .post("/checkins")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 1 });

    expect(res.status).toBe(409);
    expect(res.body.error.message).toBe("You've already checked in today");
  });

  it("returns null (not an error) when no check-in exists yet today", async () => {
    const res = await request(app)
      .get("/checkins/today")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeNull();
  });

  it("blocks a different user from updating another user's check-in", async () => {
    const createRes = await request(app)
      .post("/checkins")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 2 });
    const checkInId = createRes.body.data.id;

    const res = await request(app)
      .put(`/checkins/${checkInId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ studyHours: 10 });

    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe("Check-in not found");
  });

  it("allows the owner to update their own check-in", async () => {
    const createRes = await request(app)
      .post("/checkins")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 2 });
    const checkInId = createRes.body.data.id;

    const res = await request(app)
      .put(`/checkins/${checkInId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ studyHours: 3 });

    expect(res.status).toBe(200);
    expect(res.body.data.studyHours).toBe(3);
  });
});
