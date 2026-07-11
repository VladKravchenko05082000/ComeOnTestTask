import { useState, type FC } from "react";

import { useLogout } from "./hooks/useLogout";

import {
  Button,
  ChevronLeftIcon,
  Input,
  InputGroup,
  SearchIcon,
  UserInfo,
} from "@/components";
import { selectPlayer } from "@/store/authSlice/slice";
import { useAppSelector } from "@/hooks";

import { MobileCategories } from "./components/MobileCategories";
import { SectionHeading } from "./components/SectionHeading";
import { GameCard } from "./components/GameCard";
import { CategoriesSidebar } from "./components/CategoriesSidebar";

import type { Category, Game } from "./types";
const categories: Category[] = [
  { id: 0, name: "ALL" },
  { id: 1, name: "VIDEO SLOTS" },
  { id: 2, name: "SLOT MACHINES" },
];

const games: Game[] = [
  {
    code: "feastingfox",
    name: "Festing Fox",
    icon: "/images/game-icon/feasting_fox.png",
    description:
      "Tucked away in their cozy little coop, a brood of hens relax blissfully unaware of the danger lurking right outside. Staring in, the hungriest of foxes lays in wait, planning his attack.",
  },
  {
    code: "bookofinferno94",
    name: "Book Of Inferno",
    icon: "/images/game-icon/book_of_inferno_logo.png",
    description:
      "It's just another day in the life of Anna the Explorer, where a trio of demons have started crossing over into our realm to take over our world and end life as we know it forever.",
  },
  {
    code: "warpwreckers",
    name: "Warp Wreckers",
    icon: "/images/game-icon/warp_wreckers_powerglyph_logo.png",
    description:
      "On a planet far, far away, the world's top scientists are fighting against the clock to save their civilisation from an incoming asteroid.",
  },
];

export const GamesPage: FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const player = useAppSelector(selectPlayer);
  const { handleLogout, isLoading: isLoggingOut } = useLogout();

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

      <div className="mt-8">
        <MobileCategories
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />
      </div>

      <div className="mt-8 flex flex-col gap-8 laptop:flex-row">
        <section className="flex-1">
          <SectionHeading className="mb-4">Games</SectionHeading>

          <ul className="divide-y divide-border">
            {games.map((game) => (
              <li key={game.code} className="py-6 first:pt-0">
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        </section>

        <CategoriesSidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />
      </div>
    </div>
  );
};
