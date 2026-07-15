import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { healthRouter } from "./routes/health.routes";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { taskRouter } from "./routes/task.routes";
import { checkInRouter } from "./routes/checkin.routes";
import { friendRouter } from "./routes/friend.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

// Trust the first hop of proxying (Render's own reverse proxy) so
// express-rate-limit and req.ip correctly identify the real client,
// not the proxy itself.
app.set("trust proxy", 1);

app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());
app.use(healthRouter);
app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(checkInRouter);
app.use(friendRouter);

// Error handler must be mounted LAST, after all routes
app.use(errorHandler);
