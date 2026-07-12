import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding font-bold whitespace-nowrap transition outline-none select-none hover:-translate-y-px focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        brand: "bg-brand text-brand-foreground hover:bg-brand-hover",
        secondary:
          "border-input bg-card text-foreground hover:bg-accent aria-pressed:bg-secondary",
        ghost: "hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-9 gap-1.5 px-4 text-sm",
        sm: "h-8 gap-1 px-3 text-sm [&_svg:not([class*='size-'])]:size-3",
        lg: "h-12 gap-1.5 px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
