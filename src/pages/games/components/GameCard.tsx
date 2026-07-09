import { Link } from "react-router";

import { Button, ChevronRightIcon } from "@/components";

import type { Game } from "../types";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="flex flex-col gap-4 tablet:flex-row">
      <img
        src={game.icon}
        alt=""
        className="h-20 w-full rounded-lg object-contain tablet:w-32 tablet:shrink-0"
      />

      <div className="flex-1">
        <h3 className="font-bold">{game.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {game.description}
        </p>

        <div className="mt-4 flex justify-end">
          <Button
            as={Link}
            to={`/games/${game.code}`}
            size="sm"
            className="w-full tablet:w-auto"
          >
            <span>Play</span>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </article>
  );
};
