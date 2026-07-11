import { z } from "zod";

export const loginRequestSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const loginResponseSchema = z.object({
  status: z.literal("success"),
  player: z.object({
    name: z.string(),
    avatar: z.string(),
    event: z.string(),
  }),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
