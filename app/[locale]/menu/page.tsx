import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RestaurantMenu from "@/components/RestaurantMenu";
import Navbar from "@/components/Navbar";
import { getMenuItems } from "@/lib/menu";
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
  const menuItems = getMenuItems();

  return (
    <div className="relative min-h-svh supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-dark px-5 pb-6 pt-12 text-center text-white sm:px-8 sm:pb-8 sm:pt-14 lg:px-10">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-6xl min-h-[140px] flex-col items-center justify-between gap-8 sm:min-h-[160px]">
            <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("eyebrow")}
            </h1>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/55 transition-colors hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          </div>
        </section>

        <section className="bg-cream pb-12 sm:pb-14">
          <RestaurantMenu menuItems={menuItems} locale={locale} />
        </section>
      </main>
    </div>
  );
}
