"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ORDER_URL } from "@/lib/constants";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
] as const;

function LogoIcon({ alt }: { alt: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt={alt}
      width={65}
      height={65}
      sizes="65px"
      className="shrink-0"
    />
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col justify-center" aria-hidden="true">
      <span
        className={`block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
          open ? "translate-y-[3px] rotate-45" : ""
        }`}
      />
      <span
        className={`mt-1.5 block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`mt-1.5 block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
          open ? "-translate-y-[10px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function openDrawer() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    setIsOpen(false);
    document.body.style.overflow = "";
  }

  function toggleDrawer() {
    if (isOpen) closeDrawer();
    else openDrawer();
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/")) {
      return pathname === href;
    }

    return false;
  }

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`z-[100] flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-border bg-white px-5 md:px-8 lg:px-10 ${
          isHome ? "absolute inset-x-0 top-0" : "sticky top-0"
        }`}
      >
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5" onClick={closeDrawer}>
          <LogoIcon alt={t("logoAlt")} />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-serif text-[20px] leading-tight text-ink">
              La Félicità
            </span>
            <span className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              {t("tagline")}
            </span>
          </div>
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-5 whitespace-nowrap lg:flex xl:gap-7"
          aria-label={t("mainNav")}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative text-sm transition-colors hover:text-gold ${
                  active
                    ? "text-gold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-gold after:content-['']"
                    : "text-muted"
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-white transition-colors hover:border-gold/40 lg:hidden"
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isOpen}
          onClick={toggleDrawer}
        >
          <MenuIcon open={isOpen} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[150] bg-ink/40 backdrop-blur-[2px] transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[200] flex h-dvh min-h-0 w-[min(100vw-2.5rem,320px)] flex-col bg-white shadow-[-8px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="border-b border-border bg-cream/50 px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl text-ink">{t("drawerTitle")}</span>
            <button
              type="button"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gold-bg text-ink transition-colors hover:bg-gold hover:text-white"
              aria-label={t("closeMenu")}
              onClick={closeDrawer}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <nav className="px-4 py-2" aria-label={t("mobileNav")}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeDrawer}
                  className={`group flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                    active ? "bg-gold-bg/60 text-gold" : "text-ink hover:bg-cream"
                  }`}
                >
                  <span className={`text-[15px] font-medium ${active ? "font-semibold" : ""}`}>
                    {t(`nav.${item.key}`)}
                  </span>
                  <span
                    className={`transition-colors ${
                      active ? "text-gold" : "text-muted/50 group-hover:text-gold"
                    }`}
                  >
                    <ChevronRight />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-border bg-cream/30 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              {t("language")}
            </p>
            <LanguageSwitcher variant="drawer" />

            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
