import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-lg border bg-background transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input hover:border-foreground/30 focus:border-brand focus:ring-3 focus:ring-brand/15 focus:hover:border-brand",
        invalid: "border-destructive-border focus:border-destructive",
      },
      size: {
        default: "h-12 px-3 text-base",
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
      { size: "default", hasStartIcon: true, class: "pl-10" },
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
