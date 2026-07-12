import { cloneElement, isValidElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type InputControlProps = {
  variant?: "default" | "invalid";
  "aria-describedby"?: string;
};

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
  const errorId = error ? `${htmlFor}-error` : undefined;

  const control =
    error && isValidElement<InputControlProps>(children)
      ? cloneElement(children, {
          variant: "invalid",
          "aria-describedby": errorId,
        })
      : children;

  return (
    <div data-slot="input-group" className={className}>
      <label
        htmlFor={htmlFor}
        className={cn("mb-1.5 block text-sm font-bold", hideLabel && "sr-only")}
      >
        {label}
      </label>

      {control}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
