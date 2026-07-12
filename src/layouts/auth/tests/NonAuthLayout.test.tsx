import "@testing-library/jest-dom/vitest";

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { NonAuthLayout } from "../NonAuthLayout";

import { renderWithProviders } from "../../../test/utils";

import type { PlayerInterface } from "../../../lib";

const player: PlayerInterface = {
  name: "Rebecka Awesome",
  avatar: "/images/avatar/rebecka.jpg",
  event: "Last seen gambling on Starburst.",
  username: "rebecka",
};

const renderLayout = (
  preloadedState?: Parameters<typeof renderWithProviders>[1],
) =>
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<NonAuthLayout />}>
          <Route index element={<div>Login Form</div>} />
        </Route>
        <Route path="/games" element={<div>Games Screen</div>} />
      </Routes>
    </MemoryRouter>,
    preloadedState,
  );

describe("NonAuthLayout", () => {
  it("renders the outlet for anonymous visitors", () => {
    renderLayout();

    expect(screen.getByText("Login Form")).toBeInTheDocument();
  });

  it("redirects authenticated visitors to /games", () => {
    document.cookie = "isAuth=1; path=/";

    renderLayout({ preloadedState: { auth: { player } } });

    expect(screen.getByText("Games Screen")).toBeInTheDocument();
    expect(screen.queryByText("Login Form")).not.toBeInTheDocument();
  });
});
