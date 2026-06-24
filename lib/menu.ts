import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuBadge,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu-items";

export type { MenuBadge, MenuCategoryId, MenuItem };

export const MENU_CATEGORY_ORDER: MenuCategoryId[] = MENU_CATEGORIES.map((c) => c.id);

export function getMenuItems(): MenuItem[] {
  return MENU_ITEMS;
}

export function getMenuCategories() {
  return MENU_CATEGORIES;
}

export function formatMenuPrice(price: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategoryId | "all",
): MenuItem[] {
  if (category === "all") {
    return items;
  }

  return items.filter((item) => item.category === category);
}

export function countItemsByCategory(items: MenuItem[]): Record<MenuCategoryId | "all", number> {
  const counts = {
    all: items.length,
    entrees: 0,
    salades: 0,
    viandes: 0,
    pates: 0,
    pizzas: 0,
    desserts: 0,
    boissons: 0,
    vins: 0,
  } satisfies Record<MenuCategoryId | "all", number>;

  for (const item of items) {
    counts[item.category] += 1;
  }

  return counts;
}
