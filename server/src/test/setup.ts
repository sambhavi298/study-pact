// These must be set BEFORE any app module (which reads process.env via
// dotenv/config) gets imported by a test file. Vitest runs setupFiles
// before test files are loaded, so this ordering is guaranteed.
process.env.DATABASE_URL =
  "postgresql://studypact_dev:changeme@localhost:5432/studypact_test?schema=public";
process.env.JWT_SECRET ??= "test-secret-do-not-use-in-production";
process.env.JWT_EXPIRES_IN ??= "1h";

import { beforeEach } from "vitest";
import { prisma } from "../config/prisma";

// Deleting all Users cascades (onDelete: Cascade) to Tasks, CheckIns, and
// FriendRequests - a single statement fully resets the test database
// before every test, guaranteeing no state leaks between tests.
beforeEach(async () => {
  await prisma.user.deleteMany();
});
