import type { FC } from "react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { AppRoutes } from "./routes";

import { store } from "./store";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};
