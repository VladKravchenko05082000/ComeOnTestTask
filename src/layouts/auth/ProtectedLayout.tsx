import { Navigate, Outlet, useLocation } from "react-router";

import { selectIsAuthenticated } from "@/store/authSlice/slice";
import { useAppSelector } from "@/hooks";

import type { FC } from "react";

export const ProtectedLayout: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
