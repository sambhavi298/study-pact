import Redis from "ioredis";
import { config } from "./env";

// Not constructed in the test environment - the rate limiter is a no-op
// there, so no real Redis connection is needed to run the test suite.
export const redis = config.nodeEnv === "test" ? null : new Redis(config.redisUrl);
