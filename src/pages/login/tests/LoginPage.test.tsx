import "@testing-library/jest-dom/vitest";

import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { http, HttpResponse } from "msw";

import { LoginPage } from "../LoginPage";

import { renderWithProviders } from "../../../test/utils";
import { server } from "../../../test/server";
import { API } from "../../../test/handlers";

const renderLogin = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/games" element={<div>Games Screen</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("LoginPage", () => {
  it("logs in with valid credentials and redirects to /games", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "rebecka");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Games Screen")).toBeInTheDocument();
  });

  it("shows an error banner and keeps the username on invalid credentials", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "rebecka");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("Invalid username or password."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toHaveValue("rebecka");
    expect(screen.queryByText("Games Screen")).not.toBeInTheDocument();
  });

  it("disables the submit button while the request is pending", async () => {
    let resolveLogin!: () => void;
    const pending = new Promise<void>((resolve) => {
      resolveLogin = resolve;
    });

    server.use(
      http.post(`${API}/login`, async () => {
        await pending;
        return HttpResponse.json({
          status: "success",
          player: {
            name: "Rebecka Awesome",
            avatar: "images/avatar/rebecka.jpg",
            event: "Last seen gambling on Starburst.",
          },
        });
      }),
    );

    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "rebecka");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /login/i })).toBeDisabled(),
    );

    resolveLogin();

    expect(await screen.findByText("Games Screen")).toBeInTheDocument();
  });
});
