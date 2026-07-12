import { Link } from "react-router";

import { Button, ChevronRightIcon, Image } from "@/components";

import { ROUTES_CONFIG } from "@/lib";

import type { Game } from "@/pages/games/types";

interface GameCardProps {
  game: Game;
  categoryNames: string[];
}

export const GameCard = ({ game, categoryNames }: GameCardProps) => {
  return (
    <article className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-foreground/10 hover:shadow-card-hover tablet:flex-row">
      <div className="grid h-38 w-full shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-linear-to-br from-[#f7f8fa] to-[#e8ebef] tablet:size-33">
        <Image
          src={game.icon}
          alt=""
          className="max-h-[84%] max-w-[84%] object-contain"
          skeletonClassName="size-20"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-extrabold transition-colors group-hover:text-[#5d7a10]">
          {game.name}
        </h3>

        <p className="mt-1.5 line-clamp-3 leading-relaxed text-muted-foreground">
          {game.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          {categoryNames.map((name) => (
            <span
              key={name}
              className="rounded-full border border-brand/35 bg-brand-muted px-2.5 py-1 text-xs font-bold tracking-wide whitespace-nowrap text-[#55700e]"
            >
              {name}
            </span>
          ))}

          <Button
            as={Link}
            to={`/${ROUTES_CONFIG.games}/${game.code}`}
            variant="brand"
            size="sm"
            className="ml-auto"
          >
            <span>Play</span>
            <ChevronRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </article>
  );
};
