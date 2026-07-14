import { Request, Response } from "express";
import {
  sendFriendRequestSchema,
  friendRequestIdParamSchema,
} from "../validators/friendRequest.validator";
import {
  sendFriendRequest,
  listIncomingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  listFriends,
} from "../services/friend.service";

export async function postFriendRequest(req: Request, res: Response) {
  const { email } = sendFriendRequestSchema.parse(req.body);
  const request = await sendFriendRequest(req.userId!, email);
  res.status(201).json({ success: true, data: request });
}

export async function getFriendRequests(req: Request, res: Response) {
  const requests = await listIncomingRequests(req.userId!);
  res.status(200).json({ success: true, data: requests });
}

export async function putAcceptFriendRequest(req: Request, res: Response) {
  const { id } = friendRequestIdParamSchema.parse(req.params);
  const request = await acceptFriendRequest(req.userId!, id);
  res.status(200).json({ success: true, data: request });
}

export async function putRejectFriendRequest(req: Request, res: Response) {
  const { id } = friendRequestIdParamSchema.parse(req.params);
  const request = await rejectFriendRequest(req.userId!, id);
  res.status(200).json({ success: true, data: request });
}

export async function getFriends(req: Request, res: Response) {
  const friends = await listFriends(req.userId!);
  res.status(200).json({ success: true, data: friends });
}
