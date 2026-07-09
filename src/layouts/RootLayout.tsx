import type { FC } from "react";
import { Outlet } from "react-router";

export const RootLayout: FC = () => {
  return (
    <div className="min-h-dvh bg-page">
      <div className="mx-auto max-w-page pt-4 px-4 tablet:px-6">
        <header>
          <img src="/images/logo.svg" alt="ComeOn" className="mx-auto h-32" />
        </header>

        <main className="bg-background px-8 pt-8 pb-28">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
