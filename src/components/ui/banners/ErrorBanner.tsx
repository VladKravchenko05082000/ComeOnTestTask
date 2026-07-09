import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ErrorCircleIcon } from "@/components";
import { cn } from "@/lib/utils";

interface ErrorBannerProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const ErrorBanner = ({
  children,
  className,
  ...props
}: ErrorBannerProps) => {
  return (
    <div
      data-slot="error-banner"
      role="alert"
      className={cn(
        "flex items-start gap-2 rounded-lg border border-destructive-border bg-destructive-muted px-4 py-3",
        className,
      )}
      {...props}
    >
      <ErrorCircleIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
      <span className="text-sm text-destructive">{children}</span>
    </div>
  );
};
