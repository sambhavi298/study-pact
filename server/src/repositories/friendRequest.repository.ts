import { prisma } from "../config/prisma";

type FriendRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

const safeUserSelect = { id: true, name: true, email: true } as const;

export function createFriendRequest(senderId: string, receiverId: string) {
  return prisma.friendRequest.create({ data: { senderId, receiverId } });
}

// Finds any existing request between two users, in either direction -
// used to block duplicate/repeat requests.
export function findRequestBetween(userAId: string, userBId: string) {
  return prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId: userAId, receiverId: userBId },
        { senderId: userBId, receiverId: userAId },
      ],
      status: { in: ["PENDING", "ACCEPTED"] },
    },
  });
}

export function findRequestById(id: string) {
  return prisma.friendRequest.findUnique({ where: { id } });
}

export function findPendingReceivedRequests(userId: string) {
  return prisma.friendRequest.findMany({
    where: { receiverId: userId, status: "PENDING" },
    include: { sender: { select: safeUserSelect } },
    orderBy: { createdAt: "desc" },
  });
}

export function updateRequestStatus(id: string, status: FriendRequestStatus) {
  return prisma.friendRequest.update({ where: { id }, data: { status } });
}

export function findAcceptedFriendRequests(userId: string) {
  return prisma.friendRequest.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: { select: safeUserSelect },
      receiver: { select: safeUserSelect },
    },
  });
}
