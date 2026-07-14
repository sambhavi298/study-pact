import { z } from "zod";

export const createCheckInSchema = z.object({
  studyHours: z.coerce.number().min(0, "Study hours cannot be negative"),
  notes: z.string().optional(),
});
export type CreateCheckInInput = z.infer<typeof createCheckInSchema>;

export const updateCheckInSchema = createCheckInSchema.partial();
export type UpdateCheckInInput = z.infer<typeof updateCheckInSchema>;

export const checkInIdParamSchema = z.object({
  id: z.string(),
});
