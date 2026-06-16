"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getReservationUrl, PHONE_HREF } from "@/lib/constants";

type ReservationButtonProps = {
  children: ReactNode;
  className?: string;
};

type ModalStep = "choice" | "widget";

export default function ReservationButton({
  children,
  className,
}: ReservationButtonProps) {
  const locale = useLocale();
  const t = useTranslations("Reservation");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>("choice");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openModal() {
    setStep("choice");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setStep("choice");
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (step === "widget") {
          setStep("choice");
        } else {
          closeModal();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, step]);

  const modal =
    isOpen && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <button
              type="button"
              className="absolute inset-0 z-0 bg-ink/60 backdrop-blur-sm"
              aria-label={t("close")}
              onClick={closeModal}
            />

            {step === "choice" ? (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="reservation-choice-title"
                className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-[#5c4930] text-white shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label={t("close")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div className="px-6 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
                  <h2
                    id="reservation-choice-title"
                    className="font-serif text-3xl leading-tight sm:text-4xl"
                  >
                    {t("title")}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                    {t("intro")}
                  </p>

                  <button
                    type="button"
                    onClick={() => setStep("widget")}
                    className="mt-8 w-full cursor-pointer rounded-md bg-white px-6 py-3.5 font-serif text-sm uppercase tracking-[0.12em] text-[#5c4930] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                  >
                    {t("onlineCta")}
                  </button>

                  <p className="mt-8 text-center text-sm text-white/75">{t("phoneQuestion")}</p>

                  <a
                    href={PHONE_HREF}
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-white/80 bg-transparent px-6 py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    {t("callCta")}
                  </a>
                </div>
              </div>
            ) : (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="reservation-widget-title"
                className="relative z-10 flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep("choice")}
                      className="mb-2 inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted transition-colors hover:text-gold"
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
                    <h2
                      id="reservation-widget-title"
                      className="font-serif text-xl text-ink sm:text-2xl"
                    >
                      {t("onlineCta")}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-gold hover:text-white"
                    aria-label={t("close")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden bg-cream/30">
                  <iframe
                    title={t("iframeTitle")}
                    src={getReservationUrl(locale)}
                    className="h-[min(62dvh,520px)] w-full border-0 sm:h-[min(58dvh,560px)]"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {children}
      </button>
      {modal}
    </>
  );
}
