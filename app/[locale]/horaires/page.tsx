import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HoursSchedule from "@/components/HoursSchedule";
import Navbar from "@/components/Navbar";
import { ORDER_URL, PHONE_HREF } from "@/lib/constants";
import { getWeeklySchedule } from "@/lib/opening-hours";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HoursPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HoursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HoursPage");
  const schedule = await getWeeklySchedule();

  const dayLabels = {
    0: t("days.sunday"),
    1: t("days.monday"),
    2: t("days.tuesday"),
    3: t("days.wednesday"),
    4: t("days.thursday"),
    5: t("days.friday"),
    6: t("days.saturday"),
  } as const;

  return (
    <div className="relative min-h-svh supports-[height:100dvh]:min-h-dvh">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-dark px-5 pb-16 pt-12 text-white sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-1/4 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
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
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="relative -mt-8 px-5 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <HoursSchedule
              schedule={schedule}
              locale={locale}
              dayLabels={dayLabels}
              closedLabel={t("closed")}
              statusLabels={{
                open: t("statusOpen"),
                closed: t("statusClosed"),
                closedToday: t("statusClosedToday"),
              }}
            />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(196,154,42,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_12px_32px_rgba(196,154,42,0.45)]"
              >
                {t("orderCta")}
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_24px_rgba(196,154,42,0.12)]"
              >
                {t("callCta")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
