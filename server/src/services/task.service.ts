import {
  createTask,
  findTasksByUserId,
  findTaskById,
  updateTask,
  deleteTask,
} from "../repositories/task.repository";
import { AppError } from "../errors/AppError";
import { CreateTaskInput, UpdateTaskInput } from "../validators/task.validator";

export function createUserTask(userId: string, input: CreateTaskInput) {
  return createTask(userId, input);
}

export function listUserTasks(userId: string) {
  return findTasksByUserId(userId);
}

// Shared ownership check - every read/write below goes through this first.
// Returns 404 for both "doesn't exist" and "exists but isn't yours" - we
// never reveal whether a task belongs to someone else.
async function getOwnedTaskOrThrow(userId: string, taskId: string) {
  const task = await findTaskById(taskId);
  if (!task || task.userId !== userId) {
    throw new AppError("Task not found", 404);
  }
  return task;
}

export async function getUserTask(userId: string, taskId: string) {
  return getOwnedTaskOrThrow(userId, taskId);
}

export async function updateUserTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput,
) {
  await getOwnedTaskOrThrow(userId, taskId);
  return updateTask(taskId, input);
}

export async function deleteUserTask(userId: string, taskId: string) {
  await getOwnedTaskOrThrow(userId, taskId);
  await deleteTask(taskId);
}
