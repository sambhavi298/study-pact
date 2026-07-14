import {
  createFriendRequest,
  findRequestBetween,
  findRequestById,
  findPendingReceivedRequests,
  updateRequestStatus,
  findAcceptedFriendRequests,
} from "../repositories/friendRequest.repository";
import { findUserByEmail } from "../repositories/user.repository";
import { AppError } from "../errors/AppError";

export async function sendFriendRequest(senderId: string, email: string) {
  // Unlike login, revealing whether an email belongs to a user is expected
  // and necessary here - the entire point of this endpoint is looking
  // someone up by email to connect with them, not a credential check.
  const receiver = await findUserByEmail(email);
  if (!receiver) {
    throw new AppError("No user found with that email", 404);
  }

  if (receiver.id === senderId) {
    throw new AppError("You cannot send a friend request to yourself", 400);
  }

  const existing = await findRequestBetween(senderId, receiver.id);
  if (existing) {
    throw new AppError("A friend request already exists between you and this user", 409);
  }

  return createFriendRequest(senderId, receiver.id);
}

export function listIncomingRequests(userId: string) {
  return findPendingReceivedRequests(userId);
}

async function respondToRequest(userId: string, requestId: string, accept: boolean) {
  const request = await findRequestById(requestId);

  // Only the receiver may respond - this masks both "doesn't exist" and
  // "exists but you're not the receiver" (including the sender themselves)
  // behind the same 404, same information-hiding pattern as Tasks/Check-ins.
  if (!request || request.receiverId !== userId) {
    throw new AppError("Friend request not found", 404);
  }

  if (request.status !== "PENDING") {
    throw new AppError("This request has already been responded to", 409);
  }

  return updateRequestStatus(requestId, accept ? "ACCEPTED" : "REJECTED");
}

export function acceptFriendRequest(userId: string, requestId: string) {
  return respondToRequest(userId, requestId, true);
}

export function rejectFriendRequest(userId: string, requestId: string) {
  return respondToRequest(userId, requestId, false);
}

export async function listFriends(userId: string) {
  const requests = await findAcceptedFriendRequests(userId);
  // Each accepted request has two sides - return whichever side isn't "me".
  return requests.map((r) => (r.senderId === userId ? r.receiver : r.sender));
}
