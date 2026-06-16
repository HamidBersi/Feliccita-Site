import menuData from "@/data/menu.json";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
};

export type MenuCategory = {
  slug: string;
  label: string;
  items: MenuItem[];
};

export function getMenuCategories(): MenuCategory[] {
  return menuData as MenuCategory[];
}

export function formatMenuPrice(price: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
