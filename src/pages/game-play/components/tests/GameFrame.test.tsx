import "@testing-library/jest-dom/vitest";

import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { GameFrame } from "../GameFrame";

afterEach(() => {
  window.comeon = undefined;
});

describe("GameFrame", () => {
  it("launches the engine with the given code and renders the host element", () => {
    const launch = vi.fn();
    window.comeon = { game: { launch } };

    render(<GameFrame code="feastingfox" />);

    expect(launch).toHaveBeenCalledWith("feastingfox");
    expect(document.getElementById("game-launch")).toBeInTheDocument();
  });

  it("shows a failure message when the engine is not available", async () => {
    window.comeon = undefined;

    render(<GameFrame code="feastingfox" />);

    expect(
      await screen.findByText(/game engine failed to load/i),
    ).toBeInTheDocument();
    expect(document.getElementById("game-launch")).not.toBeInTheDocument();
  });

  it("shows a load error when launch throws", async () => {
    window.comeon = {
      game: {
        launch: vi.fn(() => {
          throw new Error("unknown code");
        }),
      },
    };

    render(<GameFrame code="does-not-exist" />);

    expect(
      await screen.findByText("This game could not be loaded."),
    ).toBeInTheDocument();
  });

  it("clears the host before relaunching when the code changes", () => {
    const launch = vi.fn((code: string) => {
      const host = document.getElementById("game-launch");
      const frame = document.createElement("iframe");
      frame.dataset.code = code;
      host?.appendChild(frame);
    });
    window.comeon = { game: { launch } };

    const { rerender } = render(<GameFrame code="one" />);

    expect(
      document.querySelector("#game-launch iframe")?.getAttribute("data-code"),
    ).toBe("one");

    rerender(<GameFrame code="two" />);

    const frames = document.querySelectorAll("#game-launch iframe");
    expect(frames).toHaveLength(1);
    expect(frames[0].getAttribute("data-code")).toBe("two");
  });
});
