import type { FC } from "react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { AppRoutes } from "./routes";

import { ErrorBoundary } from "@/components";

import { store } from "./store";

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
