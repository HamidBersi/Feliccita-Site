"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { getReservationUrl, PHONE_HREF } from "@/lib/constants";

type ReservationPanelProps = {
  autoOpenWidget?: boolean;
};

type Step = "choice" | "widget";

function CalendarBadge() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-bg text-gold shadow-[inset_0_0_0_1px_rgba(196,154,42,0.2)]">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 3V7M16 3V7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function ReservationPanel({ autoOpenWidget = false }: ReservationPanelProps) {
  const locale = useLocale();
  const t = useTranslations("Reservation");
  const tPage = useTranslations("ReservationPage");
  const [step, setStep] = useState<Step>(autoOpenWidget ? "widget" : "choice");

  useEffect(() => {
    if (autoOpenWidget) {
      setStep("widget");
    }
  }, [autoOpenWidget]);

  if (step === "widget") {
    return (
      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-4 border-b border-black/8 bg-cream/40 px-5 py-4 sm:px-6">
          <div>
            {!autoOpenWidget ? (
              <button
                type="button"
                onClick={() => setStep("choice")}
                className="mb-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-gold"
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
              </button>
            ) : null}
            <h2 className="font-serif text-xl text-ink sm:text-2xl">{t("onlineCta")}</h2>
          </div>
        </div>

        <div className="bg-cream/20">
          <iframe
            title={t("iframeTitle")}
            src={getReservationUrl(locale)}
            className="h-[min(70dvh,560px)] w-full border-0 sm:h-[min(62dvh,600px)]"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" aria-hidden="true" />

      <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
        <CalendarBadge />

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          {t("intro")}
        </p>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-gold"
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
          {tPage("back")}
        </Link>

        <button
          type="button"
          onClick={() => setStep("widget")}
          className="mt-6 w-full cursor-pointer rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(196,154,42,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_12px_32px_rgba(196,154,42,0.45)]"
        >
          {t("onlineCta")}
        </button>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/8" aria-hidden="true" />
          <span className="text-xs text-muted">{t("phoneQuestion")}</span>
          <span className="h-px flex-1 bg-black/8" aria-hidden="true" />
        </div>

        <a
          href={PHONE_HREF}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-cream/50 px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold-bg/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("callCta")}
        </a>
      </div>
    </div>
  );
}
