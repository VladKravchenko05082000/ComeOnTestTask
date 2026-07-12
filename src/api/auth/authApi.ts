import { appApi } from "@/api/appApi";

import {
  CONFIG_NAMES,
  loginResponseSchema,
  setCookie,
  type LoginRequest,
  type PlayerInterface,
} from "@/lib";

const clearAuthCookies = () => {
  setCookie(CONFIG_NAMES.isAuth, "0");
  setCookie(CONFIG_NAMES.player, "");
};

export const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<PlayerInterface, LoginRequest>({
      query: (body) => ({ url: "login", method: "POST", body }),
      transformResponse: (raw: unknown, _meta, arg) => {
        const { player } = loginResponseSchema.parse(raw);
        return { ...player, username: arg.username };
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        const result = await queryFulfilled.catch(() => null);
        if (!result) return;

        setCookie(CONFIG_NAMES.isAuth, "1");
        setCookie(
          CONFIG_NAMES.player,
          encodeURIComponent(JSON.stringify(result.data)),
        );
      },
    }),
    logout: build.mutation<void, { username: string }>({
      query: (body) => ({ url: "logout", method: "POST", body }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        await queryFulfilled.catch(() => null);
        clearAuthCookies();
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
