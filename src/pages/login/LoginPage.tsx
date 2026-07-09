import type { FC } from "react";

import { AuthForm, Input, InputGroup, LockIcon, UserIcon } from "@/components";

export const LoginPage: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center py-8">
      <AuthForm
        title="Sign in"
        description="Enter your credentials to continue."
        submitLabel="Login"
        onSubmit={handleSubmit}
      >
        <InputGroup label="Username" htmlFor="username">
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="rebecka"
            startIcon={<UserIcon />}
          />
        </InputGroup>

        <InputGroup label="Password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••"
            startIcon={<LockIcon />}
          />
        </InputGroup>
      </AuthForm>
    </div>
  );
};
