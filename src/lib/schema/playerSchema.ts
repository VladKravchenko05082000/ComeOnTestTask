import { z } from "zod";

export const playerSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  event: z.string(),
  username: z.string(),
});
