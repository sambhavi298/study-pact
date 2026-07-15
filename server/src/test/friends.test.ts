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

describe("Friends", () => {
  let senderToken: string;
  let receiverToken: string;

  beforeEach(async () => {
    senderToken = await registerAndLogin("sender@studypact.com");
    receiverToken = await registerAndLogin("receiver@studypact.com");
  });

  it("sends a friend request by email", async () => {
    const res = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe("PENDING");
  });

  it("rejects sending a request to yourself", async () => {
    const res = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "sender@studypact.com" });

    expect(res.status).toBe(400);
  });

  it("blocks a duplicate request in the same direction", async () => {
    await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });

    const res = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });

    expect(res.status).toBe(409);
  });

  it("blocks a crossed request (B cannot send to A while A→B is pending)", async () => {
    await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });

    const res = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${receiverToken}`)
      .send({ email: "sender@studypact.com" });

    expect(res.status).toBe(409);
  });

  it("blocks the sender from accepting their own sent request", async () => {
    const createRes = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });
    const requestId = createRes.body.data.id;

    const res = await request(app)
      .put(`/friend-requests/${requestId}/accept`)
      .set("Authorization", `Bearer ${senderToken}`);

    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe("Friend request not found");
  });

  it("allows the receiver to accept, and both sides then see each other as friends", async () => {
    const createRes = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });
    const requestId = createRes.body.data.id;

    const acceptRes = await request(app)
      .put(`/friend-requests/${requestId}/accept`)
      .set("Authorization", `Bearer ${receiverToken}`);
    expect(acceptRes.status).toBe(200);
    expect(acceptRes.body.data.status).toBe("ACCEPTED");

    const senderFriends = await request(app)
      .get("/friends")
      .set("Authorization", `Bearer ${senderToken}`);
    const receiverFriends = await request(app)
      .get("/friends")
      .set("Authorization", `Bearer ${receiverToken}`);

    expect(senderFriends.body.data[0].email).toBe("receiver@studypact.com");
    expect(receiverFriends.body.data[0].email).toBe("sender@studypact.com");
  });

  it("allows the receiver to reject a request", async () => {
    const createRes = await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({ email: "receiver@studypact.com" });
    const requestId = createRes.body.data.id;

    const res = await request(app)
      .put(`/friend-requests/${requestId}/reject`)
      .set("Authorization", `Bearer ${receiverToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("REJECTED");
  });
});
