import { z } from "zod";

export const sendFriendRequestSchema = z.object({
  email: z.string().email(),
});
export type SendFriendRequestInput = z.infer<typeof sendFriendRequestSchema>;

export const friendRequestIdParamSchema = z.object({
  id: z.string(),
});
