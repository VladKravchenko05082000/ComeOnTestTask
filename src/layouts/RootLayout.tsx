import type { FC } from "react";
import { Outlet } from "react-router";

export const RootLayout: FC = () => {
  return (
    <div className="min-h-dvh bg-page">
      <div className="mx-auto max-w-page pt-2 tablet:px-6 tablet:pt-4">
        <header>
          <img
            src="/images/logo.svg"
            alt="ComeOn"
            className="mx-auto h-20 tablet:h-32"
          />
        </header>

        <main className="bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
