import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authRateLimiter } from "../middlewares/rateLimiter";

export const authRouter = Router();

authRouter.post("/auth/register", authRateLimiter, register);
authRouter.post("/auth/login", authRateLimiter, login);
