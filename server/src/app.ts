import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.routes";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { taskRouter } from "./routes/task.routes";
import { checkInRouter } from "./routes/checkin.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(healthRouter);
app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(checkInRouter);

// Error handler must be mounted LAST, after all routes
app.use(errorHandler);
