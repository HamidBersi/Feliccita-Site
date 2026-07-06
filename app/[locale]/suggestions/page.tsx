import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { DAILY_SUGGESTIONS_IMAGE } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SuggestionsPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function SuggestionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("SuggestionsPage");

  return (
    <div className="relative min-h-svh bg-cream supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{t("subtitle")}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <Image
              src={DAILY_SUGGESTIONS_IMAGE}
              alt={t("imageAlt")}
              width={1200}
              height={1700}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <p className="mt-4 text-center text-xs text-muted sm:text-sm">{t("zoomHint")}</p>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-opacity hover:opacity-80"
            >
              ← {t("back")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
