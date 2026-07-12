import { cn } from "@/lib/utils";

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
    <nav
      aria-label="Categories"
      className="rounded-xl border border-border bg-card p-2 shadow-card"
    >
      <h3 className="mx-3 mt-2.5 mb-2 text-sm font-extrabold tracking-wider text-muted-foreground uppercase">
        Categories
      </h3>

      <ul className="grid gap-0.5">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <li key={category.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category.id)}
                className={cn(
                  "block w-full cursor-pointer rounded-lg px-3 py-2.5 text-left font-bold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
                  isActive
                    ? "bg-brand-muted text-[#3e520a]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
