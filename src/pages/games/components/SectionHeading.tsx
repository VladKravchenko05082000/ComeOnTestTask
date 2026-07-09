import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  className?: string;
  children: ReactNode;
}

export const SectionHeading = ({
  className,
  children,
}: SectionHeadingProps) => {
  return (
    <h2
      className={cn("border-b border-border pb-1 text-xl font-bold", className)}
    >
      {children}
    </h2>
  );
};
