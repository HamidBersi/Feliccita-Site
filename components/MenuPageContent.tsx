"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  formatMenuPrice,
  type MenuCategory,
} from "@/lib/menu";
import { MENU_PDF_URL, ORDER_URL } from "@/lib/constants";

const FALLBACK_IMAGE = "/images/Hero.jpg";

type MenuPageContentProps = {
  categories: MenuCategory[];
  locale: string;
};

export default function MenuPageContent({
  categories,
  locale,
}: MenuPageContentProps) {
  const t = useTranslations("MenuPage");
  const [activeSlug, setActiveSlug] = useState<string>("all");

  const visibleCategories = useMemo(() => {
    if (activeSlug === "all") {
      return categories;
    }

    return categories.filter((category) => category.slug === activeSlug);
  }, [activeSlug, categories]);

  const totalItems = categories.reduce(
    (count, category) => count + category.items.length,
    0,
  );

  function categoryLabel(slug: string, fallback: string) {
    return t(`categories.${slug}` as "categories.entrees") || fallback;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setActiveSlug("all")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeSlug === "all"
              ? "bg-gold text-white shadow-[0_4px_16px_rgba(196,154,42,0.35)]"
              : "border border-black/10 bg-white text-ink hover:border-gold/40"
          }`}
        >
          {t("filterAll")} ({totalItems})
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveSlug(category.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeSlug === category.slug
                ? "bg-gold text-white shadow-[0_4px_16px_rgba(196,154,42,0.35)]"
                : "border border-black/10 bg-white text-ink hover:border-gold/40"
            }`}
          >
            {categoryLabel(category.slug, category.label)} ({category.items.length})
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {visibleCategories.map((category) => (
          <section key={category.slug}>
            {activeSlug === "all" ? (
              <h2 className="mb-5 font-serif text-2xl text-ink sm:text-3xl">
                {categoryLabel(category.slug, category.label)}
              </h2>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_32px_rgba(196,154,42,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <Image
                      src={item.image ?? FALLBACK_IMAGE}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium leading-snug text-ink">{item.name}</h3>
                      <span className="shrink-0 font-semibold text-gold">
                        {formatMenuPrice(item.price, locale)}
                      </span>
                    </div>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-black/8 bg-white px-6 py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-xl text-ink">{t("ctaTitle")}</p>
          <p className="mt-1 text-sm text-muted">{t("ctaSubtitle")}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#d4aa35]"
          >
            {t("orderCta")}
          </a>
          <a
            href={MENU_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-gold/50"
          >
            {t("pdfCta")}
          </a>
        </div>
      </div>
    </div>
  );
}
