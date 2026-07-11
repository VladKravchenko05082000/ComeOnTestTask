import { useMemo } from "react";

import { useSearchParams } from "react-router";

import type { Game } from "@/lib";

const ALL_CATEGORY_ID = 0;
const SEARCH_PARAM = "search";
const CATEGORY_PARAM = "category";

export const useFilters = (games: Game[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_PARAM) ?? "";
  const activeCategoryId = Number(
    searchParams.get(CATEGORY_PARAM) ?? ALL_CATEGORY_ID,
  );

  const updateParam = (key: string, value: string, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace },
    );
  };

  const setSearch = (value: string) => updateParam(SEARCH_PARAM, value, true);

  const setCategoryId = (categoryId: number) => {
    updateParam(
      CATEGORY_PARAM,
      categoryId === ALL_CATEGORY_ID ? "" : String(categoryId),
    );
  };

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesCategory =
        activeCategoryId === ALL_CATEGORY_ID ||
        game.categoryIds.includes(activeCategoryId);
      const matchesSearch =
        query === "" || game.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [games, search, activeCategoryId]);

  return { search, activeCategoryId, filteredGames, setSearch, setCategoryId };
};
