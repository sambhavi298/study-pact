import { z } from "zod";

export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: priorityEnum.optional(),
});
export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial().extend({
  completed: z.boolean().optional(),
});
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const taskIdParamSchema = z.object({
  id: z.string(),
});
