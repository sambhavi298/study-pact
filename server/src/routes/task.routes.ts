import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  postTask,
  getTasks,
  getTask,
  putTask,
  deleteTaskHandler,
} from "../controllers/task.controller";

export const taskRouter = Router();

// Every route below requires a valid, authenticated user.
taskRouter.use(requireAuth);

taskRouter.post("/tasks", postTask);
taskRouter.get("/tasks", getTasks);
taskRouter.get("/tasks/:id", getTask);
taskRouter.put("/tasks/:id", putTask);
taskRouter.delete("/tasks/:id", deleteTaskHandler);
