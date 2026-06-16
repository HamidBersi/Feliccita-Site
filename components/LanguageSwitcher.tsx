"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

function FlagIcon({ locale, className = "" }: { locale: Locale; className?: string }) {
  if (locale === "fr") {
    return (
      <svg
        className={className}
        viewBox="0 0 20 14"
        width="20"
        height="14"
        aria-hidden="true"
      >
        <rect width="6.67" height="14" fill="#002395" />
        <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
        <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg
        className={className}
        viewBox="0 0 20 14"
        width="20"
        height="14"
        aria-hidden="true"
      >
        <rect width="20" height="14" fill="#012169" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.2" />
        <path d="M10 0V14M0 7H20" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      width="20"
      height="14"
      aria-hidden="true"
    >
      <rect width="20" height="4.67" fill="#000000" />
      <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
      <rect y="9.33" width="20" height="4.67" fill="#FFCE00" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("selectLanguage")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-white px-3 transition-colors hover:border-gold/40"
      >
        <FlagIcon locale={locale} className="rounded-sm shadow-sm" />
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 top-[calc(100%+6px)] z-[300] min-w-[160px] overflow-hidden rounded-md border border-border bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => {
            const isActive = loc === locale;

            return (
              <li key={loc} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => switchLocale(loc)}
                  className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-gold-bg text-ink"
                      : "text-ink hover:bg-cream"
                  }`}
                >
                  <FlagIcon locale={loc} className="rounded-sm shadow-sm" />
                  <span>{t(`languages.${loc}`)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
