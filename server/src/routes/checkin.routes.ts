import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  postCheckIn,
  getCheckIns,
  getTodayCheckInHandler,
  putCheckIn,
} from "../controllers/checkin.controller";

export const checkInRouter = Router();

checkInRouter.use(requireAuth);

checkInRouter.post("/checkins", postCheckIn);
checkInRouter.get("/checkins", getCheckIns);
checkInRouter.get("/checkins/today", getTodayCheckInHandler);
checkInRouter.put("/checkins/:id", putCheckIn);
