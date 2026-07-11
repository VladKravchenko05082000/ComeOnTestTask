import type { ReactNode } from "react";

import { ErrorBanner } from "@/components";

import { AuthFormBody } from "./AuthFormBody";

interface AuthFormProps {
  title: string;
  description?: string;
  submitLabel: string;
  error?: string;
  action: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
}

export const AuthForm = ({
  title,
  description,
  submitLabel,
  error,
  action,
  children,
}: AuthFormProps) => {
  return (
    <form
      action={action}
      className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm tablet:p-8"
    >
      <h1 className="text-2xl font-bold">{title}</h1>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {error && <ErrorBanner className="mt-6">{error}</ErrorBanner>}

      <AuthFormBody submitLabel={submitLabel}>{children}</AuthFormBody>
    </form>
  );
};
