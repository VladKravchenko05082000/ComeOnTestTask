import { appApi } from "@/api/appApi";

import {
  categoriesResponseSchema,
  gamesResponseSchema,
  type Category,
  type Game,
} from "@/lib";

export const gamesApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getGames: build.query<Game[], void>({
      query: () => ({ url: "games", method: "GET" }),
      transformResponse: (raw: unknown) => gamesResponseSchema.parse(raw),
    }),
    getCategories: build.query<Category[], void>({
      query: () => ({ url: "categories", method: "GET" }),
      transformResponse: (raw: unknown) => categoriesResponseSchema.parse(raw),
    }),
  }),
});

export const { useGetGamesQuery, useGetCategoriesQuery } = gamesApi;
