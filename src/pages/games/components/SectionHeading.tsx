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
    <h2 className={cn("text-2xl font-extrabold", className)}>
      {children}
    </h2>
  );
};
