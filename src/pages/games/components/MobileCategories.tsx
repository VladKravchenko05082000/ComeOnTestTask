import { Button } from "@/components";

import { SectionHeading } from "./SectionHeading";

import type { Category } from "../types";

interface MobileCategoriesProps {
  categories: Category[];
  activeCategoryId: number;
  onSelect: (categoryId: number) => void;
}

export const MobileCategories = ({
  categories,
  activeCategoryId,
  onSelect,
}: MobileCategoriesProps) => {
  return (
    <div className="laptop:hidden">
      <SectionHeading className="mb-3">Categories</SectionHeading>

      <div className="-mx-8 overflow-x-auto px-8 pb-3">
        <div className="flex gap-2">
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <Button
                key={category.id}
                size="sm"
                variant={isActive ? "default" : "secondary"}
                aria-pressed={isActive}
                onClick={() => onSelect(category.id)}
              >
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
