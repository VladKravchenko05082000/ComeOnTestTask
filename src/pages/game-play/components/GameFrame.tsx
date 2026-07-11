import { useEffect, useReducer, useRef } from "react";

import { ErrorBanner } from "@/components";

interface GameFrameProps {
  code: string;
}

type ErrorAction = { type: "clear" } | { type: "set"; payload: string };

const errorReducer = (
  state: string | null,
  action: ErrorAction,
): string | null => {
  switch (action.type) {
    case "clear":
      return null;

    case "set":
      return action.payload;

    default:
      return state;
  }
};

export const GameFrame = ({ code }: GameFrameProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, dispatch] = useReducer(errorReducer, null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    dispatch({ type: "clear" });

    if (!window.comeon?.game) {
      dispatch({
        type: "set",
        payload: "Game engine failed to load. Try refreshing the page.",
      });
      return;
    }

    try {
      window.comeon.game.launch(code);
    } catch {
      dispatch({
        type: "set",
        payload: "This game could not be loaded.",
      });
    }

    return () => {
      host.replaceChildren();
    };
  }, [code]);

  return (
    <>
      {error ? (
        <ErrorBanner>{error}</ErrorBanner>
      ) : (
        <div id="game-launch" ref={hostRef} />
      )}
    </>
  );
};
