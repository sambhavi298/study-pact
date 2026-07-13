import { Request, Response } from "express";
import { createUserSchema, userIdParamSchema } from "../validators/user.validator";
import { registerUser, getUserById } from "../services/user.service";

export async function postUser(req: Request, res: Response) {
  const input = createUserSchema.parse(req.body);
  const user = await registerUser(input);
  res.status(201).json({ success: true, data: user });
}

export async function getUser(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  const user = await getUserById(id);
  res.status(200).json({ success: true, data: user });
}
