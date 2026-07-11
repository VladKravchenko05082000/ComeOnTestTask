import type { FC } from "react";
import { Link } from "react-router";

import { Button, ChevronLeftIcon } from "@/components";
import { ROUTES_CONFIG } from "@/lib";

export const NotFoundPage: FC = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <p className="text-6xl font-bold text-muted-foreground">404</p>
      <h1 className="text-xl font-bold">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The requested page does not exist or has been moved.
      </p>

      <Button as={Link} to={`/${ROUTES_CONFIG.games}`} className="mt-2">
        <ChevronLeftIcon />
        <span>Back to games</span>
      </Button>
    </div>
  );
};
