import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import { AppError } from "../errors/AppError";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Missing or invalid authorization header", 401);
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}
