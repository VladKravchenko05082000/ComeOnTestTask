import type { FC } from "react";

import { Route, Routes } from "react-router";

import { NonAuthLayout, ProtectedLayout, RootLayout } from "./layouts";
import { GamePlayPage, GamesPage, LoginPage, NotFoundPage } from "./pages";

import { ROUTES_CONFIG } from "./lib";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<NonAuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path={ROUTES_CONFIG.games} element={<GamesPage />} />
          <Route
            path={`${ROUTES_CONFIG.games}/:code`}
            element={<GamePlayPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
