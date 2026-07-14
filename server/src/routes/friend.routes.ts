import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  postFriendRequest,
  getFriendRequests,
  putAcceptFriendRequest,
  putRejectFriendRequest,
  getFriends,
} from "../controllers/friend.controller";

export const friendRouter = Router();

friendRouter.use(requireAuth);

friendRouter.post("/friend-requests", postFriendRequest);
friendRouter.get("/friend-requests", getFriendRequests);
friendRouter.put("/friend-requests/:id/accept", putAcceptFriendRequest);
friendRouter.put("/friend-requests/:id/reject", putRejectFriendRequest);
friendRouter.get("/friends", getFriends);
