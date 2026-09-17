import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RestaurantMenu from "@/components/RestaurantMenu";
import Navbar from "@/components/Navbar";
import { getMenu } from "@/lib/menu";

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

  const menu = await getMenu();

  return (
    <div className="relative min-h-svh bg-cream supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main className="min-h-[calc(100svh-68px)] bg-cream pb-24 sm:pb-28">
        <RestaurantMenu
          menuItems={menu.items}
          categories={menu.categories}
          locale={locale}
        />
      </main>
    </div>
  );
}
