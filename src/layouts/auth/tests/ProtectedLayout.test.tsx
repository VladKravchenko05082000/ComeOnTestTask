import "@testing-library/jest-dom/vitest";

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";

import { ProtectedLayout } from "../ProtectedLayout";

import { renderWithProviders } from "../../../test/utils";

import type { PlayerInterface } from "../../../lib";

const player: PlayerInterface = {
  name: "Rebecka Awesome",
  avatar: "/images/avatar/rebecka.jpg",
  event: "Last seen gambling on Starburst.",
  username: "rebecka",
};

const LocationProbe = () => {
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from
    ?.pathname;
  return <div>redirected from: {from ?? "unknown"}</div>;
};

const renderAt = (
  path: string,
  preloadedState?: Parameters<typeof renderWithProviders>[1],
) =>
  renderWithProviders(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<LocationProbe />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/games" element={<div>Protected Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
    preloadedState,
  );

describe("ProtectedLayout", () => {
  it("redirects unauthenticated users to / and preserves the origin", () => {
    renderAt("/games");

    expect(screen.getByText("redirected from: /games")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders the outlet for authenticated users", () => {
    renderAt("/games", { preloadedState: { auth: { player } } });

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
