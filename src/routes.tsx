import type { FC } from "react";

import { Navigate, Route, Routes } from "react-router";

import { NonAuthLayout, ProtecteLayout, RootLayout } from "./layouts";
import { GamePlayPage, GamesPage, LoginPage } from "./pages";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<NonAuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route element={<ProtecteLayout />}>
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:code" element={<GamePlayPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/games" replace />} />
      </Route>
    </Routes>
  );
};
