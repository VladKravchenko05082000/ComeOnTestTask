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
      className="w-full max-w-115 rounded-xl border border-border border-t-3 border-t-brand bg-card p-6 shadow-card tablet:p-8"
    >
      <h1 className="text-2xl font-extrabold">{title}</h1>

      {description && (
        <p className="mt-1.5 text-base text-muted-foreground">{description}</p>
      )}

      {error && <ErrorBanner className="mt-6">{error}</ErrorBanner>}

      <AuthFormBody submitLabel={submitLabel}>{children}</AuthFormBody>
    </form>
  );
};
