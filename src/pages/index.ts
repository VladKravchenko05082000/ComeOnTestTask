import { lazy } from "react";

export const GamePlayPage = lazy(() =>
  import("./game-play/GamePlayPage").then((m) => ({ default: m.GamePlayPage })),
);
export const LoginPage = lazy(() =>
  import("./login/LoginPage").then((m) => ({ default: m.LoginPage })),
);
export const GamesPage = lazy(() =>
  import("./games/GamesPage").then((m) => ({ default: m.GamesPage })),
);
