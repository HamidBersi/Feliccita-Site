"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { VacationDisplay } from "@/lib/vacation";

type VacationModalProps = {
  vacation: VacationDisplay;
  dismissLabel: string;
  storageKey: string;
};

export default function VacationModal({
  vacation,
  dismissLabel,
  storageKey,
}: VacationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      setOpen(sessionStorage.getItem(storageKey) !== "1");
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismiss();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function dismiss() {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Ignore storage errors (private browsing, etc.)
    }
    setOpen(false);
  }

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
        aria-label={dismissLabel}
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vacation-modal-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gold/35 bg-gold-bg shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="border-b border-gold/20 bg-white/50 px-6 py-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {vacation.shortTitle}
          </p>
          <h2
            id="vacation-modal-title"
            className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl"
          >
            {vacation.pageTitle}
          </h2>
          <p className="mt-2 text-sm font-medium text-gold">{vacation.shortSubtitle}</p>
        </div>

        <div className="space-y-3 px-6 py-5 sm:px-8 sm:py-6">
          {vacation.messageLines.map((line) => (
            <p key={line} className="text-sm leading-relaxed text-ink/80 sm:text-base">
              {line}
            </p>
          ))}

          <button
            type="button"
            onClick={dismiss}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_8px_24px_rgba(196,154,42,0.45)] sm:text-base"
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
