import { type FC } from "react";

import { useLoginForm } from "./hooks/useLoginForm";

import {
  AuthForm,
  Input,
  InputGroup,
  LockIcon,
  PasswordInput,
  UserIcon,
} from "@/components";

export const LoginPage: FC = () => {
  const { state, formAction } = useLoginForm();

  return (
    <div className="flex flex-1 items-center justify-center py-8">
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
            placeholder="Username"
            defaultValue={state.values.username}
            startIcon={<UserIcon />}
          />
        </InputGroup>

        <InputGroup
          label="Password"
          htmlFor="password"
          error={state.fieldErrors?.password}
        >
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            defaultValue={state.values.password}
            startIcon={<LockIcon />}
          />
        </InputGroup>
      </AuthForm>
    </div>
  );
};
