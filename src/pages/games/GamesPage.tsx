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

import { MobileCategories } from "./components/MobileCategories";
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

  return (
    <div>
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
        <div>
          <UserInfo player={player} />

          <Button
            type="button"
            size="sm"
            className="mt-4"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <ChevronLeftIcon />
            <span>Log Out</span>
          </Button>
        </div>

        <div className="w-full tablet:w-64">
          <InputGroup label="Search game" htmlFor="search" hideLabel>
            <Input
              id="search"
              type="search"
              size="sm"
              placeholder="Search Game"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              endIcon={
                <SearchIcon
                  size={14}
                  className="pointer-events-auto cursor-pointer"
                />
              }
            />
          </InputGroup>
        </div>
      </div>

      {!isCategoriesError && (
        <div className="mt-8">
          <MobileCategories
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setCategoryId}
          />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-8 laptop:flex-row">
        <section className="flex-1">
          <SectionHeading className="mb-4">Games</SectionHeading>

          {isGamesError ? (
            <ErrorBanner>
              Unable to load games. Please try again later.
            </ErrorBanner>
          ) : isLoadingGames ? (
            <ul className="divide-y divide-border">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="py-6 first:pt-0">
                  <div className="flex flex-col gap-4 tablet:flex-row">
                    <Skeleton className="h-20 w-full tablet:w-32 tablet:shrink-0" />
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
            <ul className="divide-y divide-border">
              {filteredGames.map((game) => (
                <li key={game.code} className="py-6 first:pt-0">
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {!isCategoriesError && !isLoadingCategories && (
          <CategoriesSidebar
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setCategoryId}
          />
        )}
      </div>
    </div>
  );
};
