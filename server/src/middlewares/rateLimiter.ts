import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis";
import { config } from "../config/env";

// 10 attempts per 15 minutes per IP - generous enough for a genuine user who
// mistypes a password a few times, restrictive enough to blunt brute-forcing.
const realLimiter = (() => {
  if (!redis) return null;
  const client = redis; // local const so the closure below retains a non-null type

  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: string[]) =>
        client.call(...(args as [string, ...string[]])) as Promise<any>,
    }),
    message: {
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many attempts. Please try again later.",
      },
    },
  });
})();

// No-op in the test environment - rate limiting is an operational concern
// that would otherwise interfere with the test suite's repeated login calls.
export function authRateLimiter(req: Request, res: Response, next: NextFunction) {
  if (config.nodeEnv === "test" || !realLimiter) {
    return next();
  }
  return realLimiter(req, res, next);
}
