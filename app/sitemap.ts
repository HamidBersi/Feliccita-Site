import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://www.lafelicita-furdenheim.fr";

/** Pages publiques du site (sans locale). */
const PATHS = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/horaires", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/reserver", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/suggestions", priority: 0.7, changeFrequency: "daily" as const },
  { path: "/conditions", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    PATHS.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
  );
}
