import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { selectIsAuthenticated, setPlayer } from "@/store/authSlice/slice";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { CONFIG_NAMES, getCookie, type PlayerInterface } from "@/lib";

import type { FC } from "react";

export const ProtectedLayout: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthCookie = getCookie(CONFIG_NAMES.isAuth) === "1";
  const location = useLocation();

  useEffect(() => {
    if (!isAuthCookie) {
      return;
    }

    const playerCookie = getCookie(CONFIG_NAMES.player);

    if (!playerCookie) {
      return;
    }

    try {
      const player = JSON.parse(
        decodeURIComponent(playerCookie),
      ) as PlayerInterface;
      dispatch(setPlayer(player));
    } catch {
      // ignore malformed player cookie
    }
  }, [isAuthCookie]);

  if (!isAuthCookie && !isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
