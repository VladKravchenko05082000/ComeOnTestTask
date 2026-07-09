import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface InputGroupProps {
  label: string;
  htmlFor: string;
  error?: string;
  hideLabel?: boolean;
  className?: string;
  children: ReactNode;
}

export const InputGroup = ({
  label,
  htmlFor,
  error,
  hideLabel = false,
  className,
  children,
}: InputGroupProps) => {
  return (
    <div data-slot="input-group" className={className}>
      <label
        htmlFor={htmlFor}
        className={cn("mb-1.5 block text-sm font-bold", hideLabel && "sr-only")}
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
