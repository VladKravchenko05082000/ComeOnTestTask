import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./buttonsVariants";

type ButtonOwnProps<E extends ElementType> = VariantProps<
  typeof buttonVariants
> & {
  as?: E;
  className?: string;
  children?: ReactNode;
};

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

export const Button = <E extends ElementType = "button">({
  as,
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps<E>) => {
  const Component = as ?? "button";

  return (
    <Component
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};
