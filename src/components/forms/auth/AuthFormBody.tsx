import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button, ChevronRightIcon } from "@/components";

interface AuthFormBodyProps {
  submitLabel: string;
  children: ReactNode;
}

export const AuthFormBody = ({ submitLabel, children }: AuthFormBodyProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      <fieldset disabled={pending} className="mt-6 flex flex-col gap-4">
        {children}
      </fieldset>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={pending}
        className="mt-6"
      >
        <span>{submitLabel}</span>
        <ChevronRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
      </Button>
    </>
  );
};
