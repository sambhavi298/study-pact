import { Request, Response } from "express";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema,
} from "../validators/task.validator";
import {
  createUserTask,
  listUserTasks,
  getUserTask,
  updateUserTask,
  deleteUserTask,
} from "../services/task.service";

export async function postTask(req: Request, res: Response) {
  const input = createTaskSchema.parse(req.body);
  const task = await createUserTask(req.userId!, input);
  res.status(201).json({ success: true, data: task });
}

export async function getTasks(req: Request, res: Response) {
  const tasks = await listUserTasks(req.userId!);
  res.status(200).json({ success: true, data: tasks });
}

export async function getTask(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  const task = await getUserTask(req.userId!, id);
  res.status(200).json({ success: true, data: task });
}

export async function putTask(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  const input = updateTaskSchema.parse(req.body);
  const task = await updateUserTask(req.userId!, id, input);
  res.status(200).json({ success: true, data: task });
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  await deleteUserTask(req.userId!, id);
  res.status(204).send();
}
