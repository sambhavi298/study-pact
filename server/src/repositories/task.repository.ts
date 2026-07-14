import { prisma } from "../config/prisma";
import { CreateTaskInput, UpdateTaskInput } from "../validators/task.validator";

export function createTask(userId: string, input: CreateTaskInput) {
  return prisma.task.create({ data: { ...input, userId } });
}

export function findTasksByUserId(userId: string) {
  return prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}

export function findTaskById(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export function updateTask(id: string, input: UpdateTaskInput) {
  return prisma.task.update({ where: { id }, data: input });
}

export function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}
