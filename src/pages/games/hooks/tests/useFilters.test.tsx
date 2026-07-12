import { type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { useFilters } from "../useFilters";

import type { Game } from "../../../../lib";

const games: Game[] = [
  {
    name: "Book Of Inferno",
    description: "",
    code: "book",
    icon: "/images/game-icon/book.png",
    categoryIds: [1],
  },
  {
    name: "Feasting Fox",
    description: "",
    code: "fox",
    icon: "/images/game-icon/fox.png",
    categoryIds: [2],
  },
  {
    name: "Warp Wreckers",
    description: "",
    code: "warp",
    icon: "/images/game-icon/warp.png",
    categoryIds: [1, 2],
  },
];

const wrapperFor =
  (initialEntries: string[] = ["/games"]) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

const names = (list: Game[]) => list.map((game) => game.name);

describe("useFilters", () => {
  it("filters by name substring, case-insensitively and trimmed", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(),
    });

    act(() => result.current.setSearch("  BOOK "));

    expect(result.current.search).toBe("  BOOK ");
    expect(names(result.current.filteredGames)).toEqual(["Book Of Inferno"]);
  });

  it("filters by category id", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(),
    });

    act(() => result.current.setCategoryId(1));

    expect(result.current.activeCategoryId).toBe(1);
    expect(names(result.current.filteredGames)).toEqual([
      "Book Of Inferno",
      "Warp Wreckers",
    ]);
  });

  it("combines search and category filters", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(),
    });

    act(() => result.current.setCategoryId(1));
    act(() => result.current.setSearch("warp"));

    expect(names(result.current.filteredGames)).toEqual(["Warp Wreckers"]);
  });

  it("removes the category param when ALL (0) is selected", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(["/games?category=1"]),
    });

    expect(result.current.activeCategoryId).toBe(1);

    act(() => result.current.setCategoryId(0));

    expect(result.current.activeCategoryId).toBe(0);
    expect(result.current.filteredGames).toHaveLength(games.length);
  });

  it("writes the search value to the URL", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(),
    });

    act(() => result.current.setSearch("fox"));

    expect(result.current.search).toBe("fox");
    expect(names(result.current.filteredGames)).toEqual(["Feasting Fox"]);
  });

  it("does not throw on a non-numeric category param (NaN) and yields no matches", () => {
    const { result } = renderHook(() => useFilters(games), {
      wrapper: wrapperFor(["/games?category=abc"]),
    });

    expect(Number.isNaN(result.current.activeCategoryId)).toBe(true);
    expect(result.current.filteredGames).toHaveLength(0);
  });
});
