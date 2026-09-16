/**
 * Grouping UI — les catégories API (par libellé) sont rangées en familles.
 * Même mapping que felecita-suggestions.
 */
export type MenuFamilyId =
  | "all"
  | "aperitivo"
  | "antipasti"
  | "piatti"
  | "pizzeria"
  | "dolci"
  | "dopo";

export type MenuFamily = {
  id: Exclude<MenuFamilyId, "all">;
  label: string;
  navLabel?: string;
  categoryNames: string[];
  chipLabelByName?: Record<string, string>;
  countNoun: string;
};

export const MENU_FAMILIES: MenuFamily[] = [
  {
    id: "aperitivo",
    label: "Boissons",
    categoryNames: [
      "Apéritifs",
      "Cocktails",
      "Bières",
      "Boissons sans alcool",
      "Les vins",
      "Boissons",
      "Vins",
    ],
    chipLabelByName: {
      "Boissons sans alcool": "Sans alcool",
    },
    countNoun: "boissons",
  },
  {
    id: "antipasti",
    label: "Entrées",
    categoryNames: ["Entrées", "Salades"],
    countNoun: "plats",
  },
  {
    id: "piatti",
    label: "Plats",
    categoryNames: ["Viandes", "Nos poissons", "Pâtes", "Pâtes fraîches"],
    countNoun: "plats",
  },
  {
    id: "pizzeria",
    label: "Pizzas",
    categoryNames: ["Pizzas", "Pizzas spéciales"],
    countNoun: "pizzas",
  },
  {
    id: "dolci",
    label: "Desserts",
    categoryNames: ["Desserts"],
    countNoun: "desserts",
  },
  {
    id: "dopo",
    label: "Cafés & digestifs",
    navLabel: "Cafés",
    categoryNames: ["Boissons chaudes", "Les digestifs"],
    chipLabelByName: {
      "Boissons chaudes": "Chaudes",
      "Les digestifs": "Digestifs",
    },
    countNoun: "boissons",
  },
];

export function chipLabel(family: MenuFamily, categoryName: string): string {
  return family.chipLabelByName?.[categoryName] ?? categoryName;
}
