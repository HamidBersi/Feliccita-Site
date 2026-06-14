"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

export default function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className="flex items-center rounded-md border border-border p-0.5"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;

        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            aria-current={isActive ? "true" : undefined}
            className={`min-w-[36px] cursor-pointer rounded px-2 py-1.5 text-xs font-semibold uppercase transition-colors ${
              isActive
                ? "bg-gold text-white"
                : "bg-transparent text-muted hover:text-gold"
            }`}
          >
            {LOCALE_LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
