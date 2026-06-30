import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ReservationPanel from "@/components/ReservationPanel";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ online?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ReservationPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ReservationPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { online } = await searchParams;
  setRequestLocale(locale);

  const autoOpenWidget = online === "1";

  return (
    <div className="relative min-h-svh bg-cream supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-lg">
          <ReservationPanel autoOpenWidget={autoOpenWidget} />
        </div>
      </main>
    </div>
  );
}
