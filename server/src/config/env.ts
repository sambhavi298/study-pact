import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  redisUrl: process.env.REDIS_URL as string,
};

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

// Redis isn't required to run the test suite - the rate limiter is a
// no-op in the test environment (see middlewares/rateLimiter.ts).
if (config.nodeEnv !== "test" && !config.redisUrl) {
  throw new Error("REDIS_URL is not set in environment variables");
}
