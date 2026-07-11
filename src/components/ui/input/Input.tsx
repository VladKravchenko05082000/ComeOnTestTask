import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { inputVariants } from "./inputVariants";

type InputVariants = VariantProps<typeof inputVariants>;

interface InputProps
  extends
    Omit<ComponentPropsWithoutRef<"input">, "size">,
    Omit<InputVariants, "hasStartIcon" | "hasEndIcon"> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const iconPosition =
  "pointer-events-none absolute top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-muted-foreground [&>svg]:size-4";

export const Input = ({
  variant,
  size,
  startIcon,
  endIcon,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      {startIcon && (
        <span className={cn(iconPosition, "left-3")} aria-hidden="true">
          {startIcon}
        </span>
      )}

      <input
        data-slot="input"
        aria-invalid={variant === "invalid" || undefined}
        className={cn(
          inputVariants({
            variant,
            size,
            hasStartIcon: Boolean(startIcon),
            hasEndIcon: Boolean(endIcon),
            className,
          }),
        )}
        {...props}
      />

      {endIcon && (
        <span className={cn(iconPosition, "right-3")} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </div>
  );
};
