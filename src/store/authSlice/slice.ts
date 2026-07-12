import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@/api/auth";
import {
  CONFIG_NAMES,
  getCookie,
  playerSchema,
  type PlayerInterface,
} from "@/lib";

type AuthState = {
  player: PlayerInterface | null;
};

export const readPlayerFromCookie = (): PlayerInterface | null => {
  if (getCookie(CONFIG_NAMES.isAuth) !== "1") {
    return null;
  }

  const playerCookie = getCookie(CONFIG_NAMES.player);
  if (!playerCookie) {
    return null;
  }

  try {
    const parsed = playerSchema.safeParse(
      JSON.parse(decodeURIComponent(playerCookie)),
    );
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

const slice = createSlice({
  name: "auth",
  initialState: { player: readPlayerFromCookie() } as AuthState,
  reducers: {},
  selectors: {
    player: (state) => state.player,
    isAuth: (state) => state.player !== null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.player = payload;
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.player = null;
      })
      .addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
        state.player = null;
      });
  },
});

export default slice.reducer;

export const selectPlayer = (state: { auth: AuthState }) => state.auth.player;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.player !== null;
