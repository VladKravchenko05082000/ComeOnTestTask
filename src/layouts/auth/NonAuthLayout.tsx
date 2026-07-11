import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "@/store/authSlice/slice";
import { useAppSelector } from "@/hooks";

import { CONFIG_NAMES, getCookie, ROUTES_CONFIG } from "@/lib";

import type { FC } from "react";

export const NonAuthLayout: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthCookie = getCookie(CONFIG_NAMES.isAuth) === "1";

  return isAuthenticated && isAuthCookie ? (
    <Navigate to={`/${ROUTES_CONFIG.games}`} replace />
  ) : (
    <Outlet />
  );
};
