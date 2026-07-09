import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/hooks";

import type { FC } from "react";

export const ProtecteLayout: FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
