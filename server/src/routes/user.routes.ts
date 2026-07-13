import { Router } from "express";
import { postUser, getUser } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/users", postUser);
userRouter.get("/users/:id", getUser);
