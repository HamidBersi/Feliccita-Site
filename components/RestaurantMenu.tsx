"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { formatMenuPrice, type MenuCategory, type MenuItem } from "@/lib/menu";
import {
  MENU_FAMILIES,
  chipLabel,
  type MenuFamily,
  type MenuFamilyId,
} from "@/lib/menu-groups";
import MenuPageCta from "@/components/MenuPageCta";
import { HScrollRow } from "@/components/HScrollRow";
import { DishMark } from "@/components/DishMark";

type RestaurantMenuProps = {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  locale: string;
};

function splitNameAndVolume(name: string): { title: string; volume: string | null } {
  const match = name.match(/^(.*?)\s+(\d+(?:[.,]\d+)?\s*cl)\s*$/i);
  if (!match) return { title: name, volume: null };
  return { title: match[1], volume: match[2].replace(/\s+/g, "") };
}

function hasWineTiers(item: MenuItem): boolean {
  return Boolean(
    item.priceVerre || item.priceQuart || item.priceDemi || item.priceBouteille,
  );
}

function formatTier(value: string, locale: string): string {
  return formatMenuPrice(Number.parseFloat(value.replace(",", ".")), locale);
}

function WineRow({ item, locale }: { item: MenuItem; locale: string }) {
  const formats = [
    { key: "quart", label: "Quart", value: item.priceQuart },
    { key: "demi", label: "Demi", value: item.priceDemi },
    {
      key: "bouteille",
      label: "Bouteille",
      value: item.priceVerre ? item.priceBouteille : null,
    },
  ].filter((tier) => Boolean(tier.value));
  const headline = item.priceVerre ?? item.priceBouteille;

  return (
    <article className="min-w-0">
      <div className="flex min-w-0 items-baseline gap-2">
        <h3 className="min-w-0 text-[15.5px] font-semibold break-words text-ink">
          {item.name}
          {item.emoji ? (
            <>
              {" "}
              <DishMark emoji={item.emoji} />
            </>
          ) : null}
        </h3>
        <span
          className="mb-1 min-w-[1.25rem] flex-1 border-b border-dotted border-black/15"
          aria-hidden
        />
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-ink">
          {headline ? formatTier(headline, locale) : formatMenuPrice(item.price, locale)}
        </span>
      </div>
      {formats.length > 0 ? (
        <p className="mt-1 flex flex-wrap gap-x-3.5 gap-y-0.5 text-[13px] font-normal text-muted">
          {formats.map((tier) => (
            <span key={tier.key} className="tabular-nums">
              {tier.label} {formatTier(tier.value!, locale)}
            </span>
          ))}
        </p>
      ) : null}
      {item.description ? (
        <p className="mt-1 max-w-[92%] text-[13px] leading-snug text-muted">
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

function DishRow({ item, locale }: { item: MenuItem; locale: string }) {
  if (hasWineTiers(item)) {
    return <WineRow item={item} locale={locale} />;
  }

  const { title, volume } = splitNameAndVolume(item.name);

  return (
    <article className="min-w-0">
      <div className="flex min-w-0 items-baseline gap-2">
        <h3 className="min-w-0 text-[15.5px] font-semibold break-words text-ink">
          {title}
          {volume ? (
            <span className="ml-1.5 font-normal text-muted">{volume}</span>
          ) : null}
          {item.emoji ? (
            <>
              {" "}
              <DishMark emoji={item.emoji} />
            </>
          ) : null}
        </h3>
        <span
          className="mb-1 min-w-[1.25rem] flex-1 border-b border-dotted border-black/15"
          aria-hidden
        />
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-ink">
          {formatMenuPrice(item.price, locale)}
        </span>
      </div>
      {item.description ? (
        <p className="mt-0.5 max-w-[92%] text-[13px] leading-snug text-muted">
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

export default function RestaurantMenu({
  menuItems,
  categories,
  locale,
}: RestaurantMenuProps) {
  const t = useTranslations("MenuPage");
  const [familyId, setFamilyId] = useState<MenuFamilyId>("all");
  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);

  const activeFamily =
    familyId === "all"
      ? null
      : (MENU_FAMILIES.find((family) => family.id === familyId) ?? null);

  const itemsByCategoryId = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of menuItems) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [menuItems]);

  const visibleSections = useMemo(() => {
    const byLabel = new Map(categories.map((category) => [category.label, category]));

    function sectionsForFamily(family: MenuFamily) {
      return family.categoryNames
        .filter((name) => (subCategoryName ? name === subCategoryName : true))
        .map((name) => byLabel.get(name))
        .filter((category): category is MenuCategory => Boolean(category))
        .map((category) => ({
          category,
          family,
          items: itemsByCategoryId.get(category.id) ?? [],
        }))
        .filter((section) => section.items.length > 0);
    }

    if (activeFamily) {
      return sectionsForFamily(activeFamily);
    }

    const grouped = MENU_FAMILIES.flatMap((family) => sectionsForFamily(family));
    const named = new Set(MENU_FAMILIES.flatMap((family) => family.categoryNames));
    const leftovers = categories
      .filter((category) => !named.has(category.label))
      .map((category) => ({
        category,
        family: {
          id: "piatti" as const,
          label: "",
          categoryNames: [],
          countNoun: "plats",
        },
        items: itemsByCategoryId.get(category.id) ?? [],
      }))
      .filter((section) => section.items.length > 0);

    return [...grouped, ...leftovers];
  }, [activeFamily, categories, itemsByCategoryId, subCategoryName]);

  function firstSubCategoryName(family: MenuFamily): string | null {
    return (
      family.categoryNames.find((name) =>
        categories.some((category) => category.label === name),
      ) ?? null
    );
  }

  function selectFamily(next: MenuFamilyId) {
    setFamilyId(next);
    if (next === "all") {
      setSubCategoryName(null);
      return;
    }
    const family = MENU_FAMILIES.find((item) => item.id === next);
    setSubCategoryName(family ? firstSubCategoryName(family) : null);
  }

  return (
    <div className="min-w-0 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))]">
      <div className="sticky top-[68px] z-30 border-b border-black/8 bg-cream pt-2 pb-2">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <HScrollRow className="gap-2 pr-10 md:pr-0" fadeFromClass="from-cream">
            <button
              type="button"
              onClick={() => selectFamily("all")}
              className={`inline-flex shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                familyId === "all"
                  ? "border-ink bg-ink text-white"
                  : "border-black/10 bg-white text-ink"
              }`}
            >
              {t("filterAll")}
            </button>
            {MENU_FAMILIES.map((family) => (
              <button
                key={family.id}
                type="button"
                title={family.label}
                onClick={() => selectFamily(family.id)}
                className={`inline-flex shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                  familyId === family.id
                    ? "border-ink bg-ink text-white"
                    : "border-black/10 bg-white text-ink"
                }`}
              >
                {family.navLabel ?? family.label}
              </button>
            ))}
          </HScrollRow>

          {activeFamily ? (
            <div className="mt-2 border-t border-black/8 pt-1.5">
              <HScrollRow className="gap-x-1.5 pr-10 md:pr-0" fadeFromClass="from-cream">
                {activeFamily.categoryNames
                  .filter((name) => categories.some((category) => category.label === name))
                  .map((name) => {
                    const selected = subCategoryName === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setSubCategoryName(name)}
                        className={`shrink-0 border-b-2 px-3 py-1.5 text-[15px] ${
                          selected
                            ? "border-gold font-semibold text-gold"
                            : "border-transparent text-muted hover:text-gold"
                        }`}
                      >
                        {chipLabel(activeFamily, name)}
                      </button>
                    );
                  })}
              </HScrollRow>
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-2xl overflow-x-hidden px-5 sm:px-8">
        <div className="space-y-10 pt-4 sm:space-y-12 sm:pt-5">
          {visibleSections.map(({ category, family, items }) => (
            <section key={category.id}>
              <div className="mb-4 flex min-w-0 items-baseline justify-between gap-3">
                <h2 className="min-w-0 flex-1 font-serif text-2xl break-words text-gold sm:text-3xl">
                  {category.label}
                </h2>
                <span className="shrink-0 text-[13px] text-muted">
                  {items.length} {family.countNoun}
                </span>
              </div>
              <div className="space-y-5">
                {items.map((item) => (
                  <DishRow key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {visibleSections.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{t("emptyCategory")}</p>
        ) : null}
      </div>

      <MenuPageCta />
    </div>
  );
}
