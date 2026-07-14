import { Request, Response } from "express";
import { userIdParamSchema } from "../validators/user.validator";
import { getUserById } from "../services/user.service";

export async function getUser(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  const user = await getUserById(id);
  res.status(200).json({ success: true, data: user });
}

export async function getMe(req: Request, res: Response) {
  // req.userId is guaranteed to be set here - this route is only reachable
  // after requireAuth middleware has run.
  const user = await getUserById(req.userId!);
  res.status(200).json({ success: true, data: user });
}
