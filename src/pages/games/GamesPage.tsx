import { type FC } from "react";

import { useLogout } from "./hooks/useLogout";
import { useFilters } from "./hooks/useFilters";

import { useGetCategoriesQuery, useGetGamesQuery } from "@/api/games/gamesApi";
import {
  Button,
  ChevronLeftIcon,
  ErrorBanner,
  Input,
  InputGroup,
  SearchIcon,
  Skeleton,
  UserInfo,
} from "@/components";
import { selectPlayer } from "@/store/authSlice/slice";
import { useAppSelector } from "@/hooks";

import { SectionHeading } from "./components/SectionHeading";
import { GameCard } from "./components/GameCard";
import { CategoriesSidebar } from "./components/CategoriesSidebar";

export const GamesPage: FC = () => {
  const player = useAppSelector(selectPlayer);
  const { handleLogout, isLoading: isLoggingOut } = useLogout();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const {
    data: games = [],
    isLoading: isLoadingGames,
    isError: isGamesError,
  } = useGetGamesQuery();

  const { search, activeCategoryId, filteredGames, setSearch, setCategoryId } =
    useFilters(games);

  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  return (
    <div>
      <section className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-card tablet:px-6">
        <UserInfo player={player} />

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full tablet:ml-auto tablet:w-auto"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <ChevronLeftIcon className="transition-transform group-hover/button:-translate-x-0.5" />
          <span>Log Out</span>
        </Button>
      </section>

      <div className="grid items-start gap-7 laptop:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          <SectionHeading className="mb-4">Games</SectionHeading>

          {isGamesError ? (
            <ErrorBanner>
              Unable to load games. Please try again later.
            </ErrorBanner>
          ) : isLoadingGames ? (
            <ul className="grid gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  className="rounded-xl border border-border bg-card p-5 shadow-card"
                >
                  <div className="flex flex-col gap-5 tablet:flex-row">
                    <Skeleton className="h-38 w-full tablet:size-33 tablet:shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : filteredGames.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No games match your filters.
            </p>
          ) : (
            <ul className="grid gap-4">
              {filteredGames.map((game) => (
                <li key={game.code}>
                  <GameCard
                    game={game}
                    categoryNames={game.categoryIds
                      .map((id) => categoryNameById.get(id))
                      .filter((name): name is string => Boolean(name))}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="order-first grid gap-5 laptop:sticky laptop:top-22 laptop:order-0">
          <InputGroup label="Search game" htmlFor="search" hideLabel>
            <Input
              id="search"
              type="search"
              placeholder="Search Game"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              startIcon={<SearchIcon />}
              className="border-border shadow-card"
            />
          </InputGroup>

          {!isCategoriesError && !isLoadingCategories && (
            <CategoriesSidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelect={setCategoryId}
            />
          )}
        </aside>
      </div>
    </div>
  );
};
