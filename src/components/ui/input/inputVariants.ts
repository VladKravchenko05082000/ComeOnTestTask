import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-lg border bg-background transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus:border-primary",
        invalid: "border-destructive-border focus:border-destructive",
      },
      size: {
        default: "h-10 px-3 text-base",
        sm: "h-8 px-3 text-sm",
      },
      hasStartIcon: {
        true: "",
      },
      hasEndIcon: {
        true: "",
      },
    },
    compoundVariants: [
      { size: "default", hasStartIcon: true, class: "pl-9" },
      { size: "default", hasEndIcon: true, class: "pr-9" },
      { size: "sm", hasStartIcon: true, class: "pl-8" },
      { size: "sm", hasEndIcon: true, class: "pr-8" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
