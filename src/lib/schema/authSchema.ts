import { z } from "zod";

import { toAssetUrl } from "@/lib/utils";

export const loginRequestSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const loginResponseSchema = z.object({
  status: z.literal("success"),
  player: z.object({
    name: z.string(),
    avatar: z.string().transform(toAssetUrl),
    event: z.string(),
  }),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
