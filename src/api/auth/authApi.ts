import { appApi } from "@/api/appApi";

import {
  loginResponseSchema,
  type LoginRequest,
  type PlayerInterface,
} from "@/lib";

export const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<PlayerInterface, LoginRequest>({
      query: (body) => ({ url: "login", method: "POST", body }),
      transformResponse: (raw: unknown, _meta, arg) => {
        const { player } = loginResponseSchema.parse(raw);
        return { ...player, username: arg.username };
      },
    }),
    logout: build.mutation<void, { username: string }>({
      query: (body) => ({ url: "logout", method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
