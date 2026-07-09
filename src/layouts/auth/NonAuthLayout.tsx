import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks";

export const NonAuthLayout: FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/games" replace /> : <Outlet />;
};
