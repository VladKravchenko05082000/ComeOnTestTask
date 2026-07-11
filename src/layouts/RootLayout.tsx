import { Suspense, type FC } from "react";
import { Outlet } from "react-router";

import { SpinnerIcon } from "@/components";

export const RootLayout: FC = () => {
  return (
    <div className="min-h-dvh bg-background">
      <header className="bg-page py-2">
        <img src="/images/logo.svg" alt="ComeOn" className=" h-8 tablet:h-12" />
      </header>

      <main className="mx-auto max-w-page p-8 tablet:px-6">
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
    </div>
  );
};
