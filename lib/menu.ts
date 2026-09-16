import {
  MENU_CATEGORIES as FALLBACK_CATEGORIES,
  MENU_ITEMS as FALLBACK_ITEMS,
  type MenuBadge,
  type MenuItem as FallbackMenuItem,
} from "@/data/menu-items";

/** Identifiant de catégorie (cuid API ou slug fallback statique). */
export type MenuCategoryId = string;

export type { MenuBadge };

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  /** null = prix non numérique (« Sur demande ») */
  price: number | null;
  badge?: MenuBadge;
  priceVerre?: string | null;
  priceQuart?: string | null;
  priceDemi?: string | null;
  priceBouteille?: string | null;
  emoji?: string | null;
};

export type MenuData = {
  categories: MenuCategory[];
  items: MenuItem[];
  /** true = données venues de l’API suggestions */
  source: "api" | "fallback";
};

type ApiMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  isAvailable?: boolean;
  position?: number;
  priceVerre?: string | null;
  priceQuart?: string | null;
  priceDemi?: string | null;
  priceBouteille?: string | null;
  emoji?: string | null;
};

type ApiMenuCategory = {
  id: string;
  name: string;
  position?: number;
  menuType?: string;
  items: ApiMenuItem[];
};

/**
 * URL de l’API menu (app felecita-suggestions).
 * Ex. local (vitrine :3000) : http://localhost:3001/api/menu?type=salle
 * Prod : https://felicita-suggestion.vercel.app/api/menu?type=salle
 */
function getMenuApiUrl(): string {
  const configured = process.env.MENU_API_URL?.trim();
  if (configured) return configured;

  return "https://felicita-suggestion.vercel.app/api/menu?type=salle";
}

function parsePrice(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!/^\d/.test(trimmed)) return null; // "Sur demande", etc.
  const normalized = trimmed.replace(",", ".");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : null;
}

function mapApiCategories(payload: ApiMenuCategory[]): MenuData {
  // Même si l’API ignore ?type=, on ne garde que la carte salle.
  const salle = payload
    .filter((category) => !category.menuType || category.menuType === "salle")
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  const categories: MenuCategory[] = salle.map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const items: MenuItem[] = [];
  for (const category of salle) {
    const sortedItems = [...category.items].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );
    for (const item of sortedItems) {
      if (item.isAvailable === false) continue;
      items.push({
        id: item.id,
        name: item.name,
        category: category.id,
        description: item.description?.trim() ?? "",
        price: parsePrice(item.price),
        priceVerre: item.priceVerre ?? null,
        priceQuart: item.priceQuart ?? null,
        priceDemi: item.priceDemi ?? null,
        priceBouteille: item.priceBouteille ?? null,
        emoji: item.emoji ?? null,
      });
    }
  }

  return { categories, items, source: "api" };
}

function mapFallback(): MenuData {
  const categories: MenuCategory[] = FALLBACK_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
  }));

  const items: MenuItem[] = FALLBACK_ITEMS.map((item: FallbackMenuItem) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    badge: item.badge,
  }));

  return { categories, items, source: "fallback" };
}

/**
 * Charge le menu salle depuis felecita-suggestions.
 * En échec réseau / JSON invalide → carte statique locale (ancien emporter).
 */
export async function getMenu(): Promise<MenuData> {
  const url = getMenuApiUrl();

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Menu API ${response.status} (${url}) — fallback statique`);
      return mapFallback();
    }

    const payload = (await response.json()) as unknown;
    if (!Array.isArray(payload)) {
      console.error("Menu API: payload invalide — fallback statique");
      return mapFallback();
    }

    const mapped = mapApiCategories(payload as ApiMenuCategory[]);
    if (mapped.categories.length === 0) {
      console.error("Menu API: aucune catégorie salle — fallback statique");
      return mapFallback();
    }

    return mapped;
  } catch (error) {
    console.error("Menu API unreachable — fallback statique", error);
    return mapFallback();
  }
}

/** @deprecated Préférer getMenu() — conservé pour imports éventuels. */
export async function getMenuItems(): Promise<MenuItem[]> {
  const menu = await getMenu();
  return menu.items;
}

export function formatMenuPrice(
  price: number | null,
  locale: string,
  unavailableLabel = "Sur demande",
): string {
  if (price === null) return unavailableLabel;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategoryId | "all",
): MenuItem[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}
