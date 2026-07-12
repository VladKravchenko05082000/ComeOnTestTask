import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@/components";
import { cn } from "@/lib/utils";

import { Input, type InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type" | "endIcon">;

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />

      <button
        type="button"
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm p-1 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50"
      >
        {isVisible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
};
