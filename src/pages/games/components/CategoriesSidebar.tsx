import { Button } from "@/components";

import { SectionHeading } from "./SectionHeading";

import type { Category } from "../types";

interface CategoriesSidebarProps {
  categories: Category[];
  activeCategoryId: number;
  onSelect: (categoryId: number) => void;
}

export const CategoriesSidebar = ({
  categories,
  activeCategoryId,
  onSelect,
}: CategoriesSidebarProps) => {
  return (
    <aside className="hidden w-64 shrink-0 laptop:block">
      <SectionHeading className="mb-4">Categories</SectionHeading>

      <ul className="flex flex-col gap-1">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <li key={category.id}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                fullWidth
                aria-pressed={isActive}
                className="justify-start"
                onClick={() => onSelect(category.id)}
              >
                {category.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
