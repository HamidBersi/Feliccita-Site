import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const CGU_URL =
  "https://cdn.reservation.dish.co/static-static/static/pp-tc/tc_FR.pdf";
const PRIVACY_URL =
  "https://cdn.reservation.dish.co/static-static/static/pp-tc/privacy_FR.pdf";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConditionsPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ConditionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ConditionsPage");

  return (
    <div className="relative min-h-svh bg-cream supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{t("intro")}</p>

          <div className="mt-8 space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-8">
            <p className="text-sm leading-relaxed text-muted">{t("summary")}</p>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={CGU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline-offset-2 hover:underline"
                >
                  {t("cguLink")}
                </a>
              </li>
              <li>
                <a
                  href={PRIVACY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold underline-offset-2 hover:underline"
                >
                  {t("privacyLink")}
                </a>
              </li>
            </ul>

            <p className="border-t border-black/8 pt-4 text-xs leading-relaxed text-muted">
              {t("bloctel")}
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reserver"
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
