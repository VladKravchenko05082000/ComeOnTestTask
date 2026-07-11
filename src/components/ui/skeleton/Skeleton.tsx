import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Render as an inline placeholder (e.g. inside a line of text) instead of a
   * block. Defaults to a block element.
   */
  inline?: boolean;
}

export const Skeleton = ({ inline, className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-page",
        inline ? "inline-block align-middle" : "block",
        className,
      )}
      {...props}
    />
  );
};
