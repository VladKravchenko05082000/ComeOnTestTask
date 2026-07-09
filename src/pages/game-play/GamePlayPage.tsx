import type { FC } from "react";
import { Link, useParams } from "react-router";

import { Button, ChevronLeftIcon } from "@/components";

export const GamePlayPage: FC = () => {
  const { code } = useParams<{ code: string }>();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Button as={Link} to="/games" size="sm">
          <ChevronLeftIcon />
          Back
        </Button>

        <h1 className="truncate text-xl font-bold">{code}</h1>
      </div>

      <div className="mx-auto w-full max-w-160">
        <div
          id="game-launch"
          className="flex h-84 w-full items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground tablet:h-96 [&>iframe]:size-full [&>iframe]:rounded-lg"
        >
          Game frame placeholder
        </div>
      </div>
    </div>
  );
};
