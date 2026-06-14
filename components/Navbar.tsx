"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "#about" },
  { key: "reviews", href: "#reviews" },
  { key: "contact", href: "#contact" },
] as const;

function LogoIcon({ alt }: { alt: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt={alt}
      width={65}
      height={65}
      className="shrink-0"
      priority
    />
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

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : false;
  }

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <header className="sticky top-0 z-[100] flex h-[68px] items-center justify-between border-b border-border bg-white px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon alt={t("logoAlt")} />
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight text-ink">
              La Félicità
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
              {t("tagline")}
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
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

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="cursor-pointer border-none bg-transparent p-2 text-2xl leading-none text-ink md:hidden"
          aria-label={t("openMenu")}
          aria-expanded={isOpen}
          onClick={openDrawer}
        >
          ☰
        </button>
      </header>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-[150] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer mobile */}
      <aside
        className={`fixed right-0 top-0 z-[200] h-screen w-[280px] bg-white px-8 pb-8 pt-20 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="absolute right-5 top-5 cursor-pointer border-none bg-transparent text-[28px] leading-none text-muted"
          aria-label={t("closeMenu")}
          onClick={closeDrawer}
        >
          &times;
        </button>

        <div className="mb-8">
          <LanguageSwitcher />
        </div>

        <nav className="flex flex-col gap-6" aria-label={t("mobileNav")}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-base text-ink transition-colors hover:text-gold"
              onClick={closeDrawer}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
