import { Suspense, type FC } from "react";
import { Link, Outlet } from "react-router";

import { LogoIcon, SpinnerIcon } from "@/components";

export const RootLayout: FC = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-background/5 bg-page/95 backdrop-blur-[6px]">
        <div className="mx-auto flex h-15 w-full max-w-page items-center px-8 tablet:px-6">
          <Link
            to="/"
            aria-label="ComeOn — home"
            className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <LogoIcon
              aria-hidden="true"
              className="h-5 w-27 tablet:h-7 tablet:w-38"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-page flex-1 flex-col p-8 tablet:px-6">
        <Suspense
          fallback={
            <div className="flex min-h-[60dvh] items-center justify-center">
              <SpinnerIcon size={80} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="bg-page p-5 text-center text-sm leading-[1.8] text-background/55">
        <p>All rights reserved by ComeOn Group © 2026</p>
        <p>
          Developed by <strong className="text-brand">Vladyslav Kravchenko</strong>
        </p>
      </footer>
    </div>
  );
};
