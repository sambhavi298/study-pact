import express from "express";
import { healthRouter } from "./routes/health.routes";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(authRouter);
app.use(userRouter);

// Error handler must be mounted LAST, after all routes
app.use(errorHandler);
