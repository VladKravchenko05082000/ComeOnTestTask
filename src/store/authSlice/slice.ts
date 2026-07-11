import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "@/api/auth";
import { CONFIG_NAMES, setCookie, type PlayerInterface } from "@/lib";

type AuthState = {
  player: PlayerInterface | null;
};

const clearAuth = (state: AuthState) => {
  state.player = null;
  setCookie(CONFIG_NAMES.isAuth, "0");
  setCookie(CONFIG_NAMES.player, "");
};

const slice = createSlice({
  name: "auth",
  initialState: { player: null } as AuthState,
  reducers: {
    setPlayer: (state, { payload }: PayloadAction<PlayerInterface>) => {
      state.player = payload;
    },
  },
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
          setCookie(CONFIG_NAMES.isAuth, "1");
          setCookie(
            CONFIG_NAMES.player,
            encodeURIComponent(JSON.stringify(payload)),
          );
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, clearAuth)
      .addMatcher(authApi.endpoints.logout.matchRejected, clearAuth);
  },
});

export default slice.reducer;

export const { setPlayer } = slice.actions;

export const selectPlayer = (state: { auth: AuthState }) => state.auth.player;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.player !== null;
