import "@testing-library/jest-dom/vitest";

import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { http, HttpResponse } from "msw";

import { GamesPage } from "../GamesPage";

import { renderWithProviders } from "../../../test/utils";
import { server } from "../../../test/server";
import { API } from "../../../test/handlers";

const renderGames = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={["/games"]}>
      <GamesPage />
    </MemoryRouter>,
  );

describe("GamesPage", () => {
  it("renders the game list from the API", async () => {
    renderGames();

    expect(await screen.findByText("Book Of Inferno")).toBeInTheDocument();
    expect(screen.getByText("Festing Fox")).toBeInTheDocument();
    expect(screen.getByText("Scatter Monsters")).toBeInTheDocument();
  });

  it("filters the list as the user types in search", async () => {
    const user = userEvent.setup();
    renderGames();

    await screen.findByText("Book Of Inferno");

    await user.type(screen.getByPlaceholderText("Search Game"), "book");

    await waitFor(() =>
      expect(screen.queryByText("Festing Fox")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("Book Of Inferno")).toBeInTheDocument();
  });

  it("filters the list when a category is selected", async () => {
    const user = userEvent.setup();
    renderGames();

    await screen.findAllByRole("button", { name: "VIDEO SLOTS" });

    await user.click(
      screen.getAllByRole("button", { name: "VIDEO SLOTS" })[0],
    );

    await waitFor(() =>
      expect(screen.queryByText("Festing Fox")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("Book Of Inferno")).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderGames();

    await screen.findByText("Book Of Inferno");

    await user.type(screen.getByPlaceholderText("Search Game"), "zzzzzz");

    expect(
      await screen.findByText("No games match your filters."),
    ).toBeInTheDocument();
  });

  it("shows an error banner when /games fails", async () => {
    server.use(
      http.get(`${API}/games`, () => HttpResponse.json(null, { status: 500 })),
    );

    renderGames();

    expect(
      await screen.findByText("Unable to load games. Please try again later."),
    ).toBeInTheDocument();
  });
});
