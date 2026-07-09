import type { FormEvent, ReactNode } from "react";

import { Button, ChevronRightIcon, ErrorBanner } from "@/components";

interface AuthFormProps {
  title: string;
  description?: string;
  submitLabel: string;
  error?: string | null;
  isLoading?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export const AuthForm = ({
  title,
  description,
  submitLabel,
  error,
  isLoading = false,
  onSubmit,
  children,
}: AuthFormProps) => {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm tablet:p-8"
    >
      <h1 className="text-2xl font-bold">{title}</h1>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {error && <ErrorBanner className="mt-6">{error}</ErrorBanner>}

      <fieldset disabled={isLoading} className="mt-6 flex flex-col gap-4">
        {children}
      </fieldset>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={isLoading}
        className="mt-6"
      >
        <span>{submitLabel}</span>
        <ChevronRightIcon />
      </Button>
    </form>
  );
};
