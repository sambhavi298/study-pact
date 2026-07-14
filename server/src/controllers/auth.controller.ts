import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerUser } from "../services/user.service";
import { findUserByEmail } from "../repositories/user.repository";
import { verifyPassword, generateToken } from "../services/auth.service";
import { AppError } from "../errors/AppError";

// A precomputed bcrypt hash of an arbitrary string - never matches a real
// password. Used only to keep login response timing consistent whether or
// not the email exists (see login() below).
const DUMMY_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8n5NxpEXPMK2ynSSXDeUKQEUfXjTQ2";

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const user = await registerUser(input);
  res.status(201).json({ success: true, data: user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await findUserByEmail(email);

  // Always run bcrypt.compare, even for a nonexistent user, against a dummy
  // hash - so response timing doesn't reveal whether the email exists.
  const hashToCompare = user?.password ?? DUMMY_HASH;
  const isValid = await verifyPassword(password, hashToCompare);

  if (!user || !isValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id);
  res.status(200).json({ success: true, data: { token } });
}
