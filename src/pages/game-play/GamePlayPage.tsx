import type { FC } from "react";
import { Link, useParams } from "react-router";

import { useGetGamesQuery } from "@/api/games/gamesApi";

import { Button, ChevronLeftIcon, ErrorBanner } from "@/components";
import { cn } from "@/lib/utils";
import { GameFrame } from "./components/GameFrame";

const gameStageClasses = cn(
  "relative flex h-84 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-linear-to-br from-[#fbfcfd] to-[#eef1f4] p-4 shadow-card tablet:h-96",
  "[&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full [&_iframe]:rounded-xl [&_iframe]:border-0",
);

export const GamePlayPage: FC = () => {
  const { code } = useParams<{ code: string }>();
  const { data: games = [], isLoading } = useGetGamesQuery();

  const game = games.find((g) => g.code === code);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Button as={Link} to="/games" variant="secondary" size="sm">
          <ChevronLeftIcon className="transition-transform group-hover/button:-translate-x-0.5" />
          <span>Back</span>
        </Button>

        {game && (
          <h1 className="truncate text-2xl font-extrabold">{game.name}</h1>
        )}
      </div>

      <div className={gameStageClasses}>
        {!isLoading && !game ? (
          <p className="text-center text-muted-foreground">Game not found.</p>
        ) : code ? (
          <GameFrame code={code} />
        ) : (
          <ErrorBanner>
            No game was specified. Please go back and choose a game to play.
          </ErrorBanner>
        )}
      </div>
    </div>
  );
};
