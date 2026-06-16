import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MenuPageContent from "@/components/MenuPageContent";
import Navbar from "@/components/Navbar";
import { getMenuCategories } from "@/lib/menu";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MenuPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("MenuPage");
  const categories = getMenuCategories();

  return (
    <div className="relative min-h-svh supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-dark px-5 pb-12 pt-12 text-white sm:px-8 sm:pb-14 sm:pt-14 lg:px-10">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("back")}
            </Link>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
          <MenuPageContent categories={categories} locale={locale} />
        </section>
      </main>
    </div>
  );
}
