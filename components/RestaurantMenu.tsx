"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  filterMenuItems,
  formatMenuPrice,
  MENU_CATEGORY_ORDER,
  type MenuCategoryId,
  type MenuItem,
} from "@/lib/menu";
import MenuPageCta from "@/components/MenuPageCta";

type RestaurantMenuProps = {
  menuItems: MenuItem[];
  locale: string;
};

type FilterId = MenuCategoryId | "all";

function MenuItemCard({ item, locale }: { item: MenuItem; locale: string }) {
  return (
    <article className="group rounded-2xl border border-black/8 bg-white px-4 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-[0_12px_32px_rgba(196,154,42,0.1)] sm:px-5 sm:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium leading-snug text-ink">{item.name}</h3>
          {item.description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          ) : null}
        </div>
        <span className="shrink-0 font-sans text-base font-semibold tabular-nums text-ink sm:text-lg">
          {formatMenuPrice(item.price, locale)}
        </span>
      </div>
    </article>
  );
}

export default function RestaurantMenu({ menuItems, locale }: RestaurantMenuProps) {
  const t = useTranslations("MenuPage");
  const [selectedCategory, setSelectedCategory] = useState<FilterId>("all");
  const filtersRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const NAVBAR_HEIGHT = 68;

  function getStickyOffset() {
    const filtersHeight = filtersRef.current?.offsetHeight ?? 44;
    return NAVBAR_HEIGHT + filtersHeight + 16;
  }

  function handleCategoryChange(category: FilterId) {
    setSelectedCategory(category);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const list = listRef.current;
        if (!list) {
          return;
        }

        const top = list.getBoundingClientRect().top + window.scrollY - getStickyOffset();
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  }

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t("filterAll") },
    ...MENU_CATEGORY_ORDER.map((id) => ({
      id,
      label: t(`categories.${id}`),
    })),
  ];

  const filteredItems = useMemo(
    () => filterMenuItems(menuItems, selectedCategory),
    [menuItems, selectedCategory],
  );

  const groupedItems = useMemo(() => {
    if (selectedCategory !== "all") {
      return [{ category: selectedCategory, items: filteredItems }];
    }

    return MENU_CATEGORY_ORDER.map((category) => ({
      category,
      items: filterMenuItems(menuItems, category),
    })).filter((group) => group.items.length > 0);
  }, [filteredItems, menuItems, selectedCategory]);

  return (
    <div className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
      <div
        ref={filtersRef}
        className="sticky top-[68px] z-30 w-full border-b border-black/8 bg-cream py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto flex max-w-4xl flex-nowrap gap-1.5 overflow-x-auto px-5 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleCategoryChange(filter.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300 sm:text-sm ${
                selectedCategory === filter.id
                  ? "bg-gold text-white shadow-[0_2px_10px_rgba(196,154,42,0.3)]"
                  : "border border-black/10 bg-white text-ink hover:border-gold/40 hover:bg-gold-bg/40"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-4xl px-5 sm:px-8 lg:px-10">
        <div
          ref={listRef}
          className="scroll-mt-[calc(68px+3.75rem)] space-y-10 pt-6 sm:space-y-12 sm:pt-8"
        >
        {groupedItems.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 font-serif text-2xl text-ink sm:mb-5 sm:text-3xl">
              {t(`categories.${group.category}`)}
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {group.items.map((item) => (
                <MenuItemCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </section>
        ))}
        </div>

        {filteredItems.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{t("emptyCategory")}</p>
        ) : null}
      </div>

      <MenuPageCta />
    </div>
  );
}
