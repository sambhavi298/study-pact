import { Router } from "express";
import { getUser, getMe } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/requireAuth";

export const userRouter = Router();

// IMPORTANT: /users/me must be registered before /users/:id, or Express
// would match "me" as an :id value instead.
userRouter.get("/users/me", requireAuth, getMe);
userRouter.get("/users/:id", getUser);
