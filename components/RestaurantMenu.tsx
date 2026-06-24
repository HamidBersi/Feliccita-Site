"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  countItemsByCategory,
  filterMenuItems,
  formatMenuPrice,
  MENU_CATEGORY_ORDER,
  type MenuCategoryId,
  type MenuItem,
} from "@/lib/menu";
import { ORDER_URL } from "@/lib/constants";

type RestaurantMenuProps = {
  menuItems: MenuItem[];
  locale: string;
};

type FilterId = MenuCategoryId | "all";

function MenuItemCard({
  item,
  locale,
  badgeSignature,
  badgePopular,
}: {
  item: MenuItem;
  locale: string;
  badgeSignature: string;
  badgePopular: string;
}) {
  return (
    <article className="group rounded-2xl border border-black/8 bg-white px-4 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-[0_12px_32px_rgba(196,154,42,0.1)] sm:px-5 sm:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium leading-snug text-ink">{item.name}</h3>
            {item.badge === "signature" ? (
              <span className="shrink-0 rounded-full bg-dark px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                {badgeSignature}
              </span>
            ) : null}
            {item.badge === "popular" ? (
              <span className="shrink-0 rounded-full bg-gold-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                {badgePopular}
              </span>
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          ) : null}
        </div>
        <span className="shrink-0 font-serif text-base font-medium text-gold sm:text-lg">
          {formatMenuPrice(item.price, locale)}
        </span>
      </div>
    </article>
  );
}

export default function RestaurantMenu({ menuItems, locale }: RestaurantMenuProps) {
  const t = useTranslations("MenuPage");
  const [selectedCategory, setSelectedCategory] = useState<FilterId>("all");

  const counts = useMemo(() => countItemsByCategory(menuItems), [menuItems]);

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

  const filters: { id: FilterId; label: string; count: number }[] = [
    { id: "all", label: t("filterAll"), count: counts.all },
    ...MENU_CATEGORY_ORDER.map((id) => ({
      id,
      label: t(`categories.${id}`),
      count: counts[id],
    })),
  ];

  const badgeSignature = t("badgeSignature");
  const badgePopular = t("badgePopular");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="sticky top-[68px] z-20 -mx-5 bg-cream/95 px-5 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-cream/85 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedCategory(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === filter.id
                  ? "bg-gold text-white shadow-[0_4px_16px_rgba(196,154,42,0.35)]"
                  : "border border-black/10 bg-white text-ink hover:border-gold/40 hover:bg-gold-bg/40"
              }`}
            >
              {filter.label}
              <span className="ml-1.5 opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
        {groupedItems.map((group) => (
          <section key={group.category}>
            {selectedCategory === "all" ? (
              <h2 className="mb-4 font-serif text-2xl text-ink sm:mb-5 sm:text-3xl">
                {t(`categories.${group.category}`)}
              </h2>
            ) : null}

            <div className="space-y-3 sm:space-y-4">
              {group.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  badgeSignature={badgeSignature}
                  badgePopular={badgePopular}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted">{t("emptyCategory")}</p>
      ) : null}

      <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-black/8 bg-white px-6 py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-xl text-ink">{t("ctaTitle")}</p>
          <p className="mt-1 text-sm text-muted">{t("ctaSubtitle")}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#d4aa35]"
          >
            {t("orderCta")}
          </a>
        </div>
      </div>
    </div>
  );
}
