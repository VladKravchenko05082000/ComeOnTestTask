import { type FC } from "react";

import { useLoginForm } from "./hooks/useLoginForm";

import { AuthForm, Input, InputGroup, LockIcon, UserIcon } from "@/components";

export const LoginPage: FC = () => {
  const { state, formAction } = useLoginForm();

  return (
    <div className="flex min-h-[50vh] items-center justify-center py-8">
      <AuthForm
        title="Sign in"
        description="Enter your credentials to continue."
        submitLabel="Login"
        error={state.formError}
        action={formAction}
      >
        <InputGroup
          label="Username"
          htmlFor="username"
          error={state.fieldErrors?.username}
        >
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            defaultValue={state.values.username}
            startIcon={<UserIcon />}
          />
        </InputGroup>

        <InputGroup
          label="Password"
          htmlFor="password"
          error={state.fieldErrors?.password}
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            startIcon={<LockIcon />}
          />
        </InputGroup>
      </AuthForm>
    </div>
  );
};
