import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const gameSchema = z.object({
  name: z.string(),
  description: z.string(),
  code: z.string(),
  icon: z.string(),
  categoryIds: z.array(z.number()),
});

export const gamesResponseSchema = z.array(gameSchema);
export const categoriesResponseSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
export type Game = z.infer<typeof gameSchema>;
