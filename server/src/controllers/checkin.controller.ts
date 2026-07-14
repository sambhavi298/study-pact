import { Request, Response } from "express";
import {
  createCheckInSchema,
  updateCheckInSchema,
  checkInIdParamSchema,
} from "../validators/checkin.validator";
import {
  createTodayCheckIn,
  listUserCheckIns,
  getTodayCheckIn,
  updateUserCheckIn,
} from "../services/checkin.service";

export async function postCheckIn(req: Request, res: Response) {
  const input = createCheckInSchema.parse(req.body);
  const checkIn = await createTodayCheckIn(req.userId!, input);
  res.status(201).json({ success: true, data: checkIn });
}

export async function getCheckIns(req: Request, res: Response) {
  const checkIns = await listUserCheckIns(req.userId!);
  res.status(200).json({ success: true, data: checkIns });
}

export async function getTodayCheckInHandler(req: Request, res: Response) {
  const checkIn = await getTodayCheckIn(req.userId!);
  res.status(200).json({ success: true, data: checkIn });
}

export async function putCheckIn(req: Request, res: Response) {
  const { id } = checkInIdParamSchema.parse(req.params);
  const input = updateCheckInSchema.parse(req.body);
  const checkIn = await updateUserCheckIn(req.userId!, id, input);
  res.status(200).json({ success: true, data: checkIn });
}
