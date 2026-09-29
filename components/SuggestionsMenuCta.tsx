"use client";

import { SUGGESTIONS_DISPLAY_URL } from "@/lib/constants";
import { tUi, type MenuLocale } from "@/lib/menu-i18n";

export const FISH_CATEGORY = "Nos poissons";
export const FISH_ITEM_NAME = "Poissons du jour";

export function isFishCategory(name: string): boolean {
  return name === FISH_CATEGORY;
}

export function isFishOfTheDay(name: string): boolean {
  return name === FISH_ITEM_NAME;
}

export function fishDescriptionWithoutBoardHint(
  description: string | null | undefined,
): string | null {
  if (!description?.trim()) return null;
  const cleaned = description
    .replace(
      /Merci de consulter le tableau de suggestions ou notre service en salle\.\s*/i,
      "",
    )
    .replace(/Please check the specials board or ask our team\.\s*/i, "")
    .replace(
      /Bitte schauen Sie auf die Empfehlungstafel oder fragen Sie unser Team\.\s*/i,
      "",
    )
    .replace(
      /Consultate il tabellone dei suggerimenti o il nostro servizio in sala\.\s*/i,
      "",
    )
    .trim();
  return cleaned || null;
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SuggestionsFilterHint({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <div className="mt-2 flex justify-end px-5 sm:px-8">
      <a
        href={SUGGESTIONS_DISPLAY_URL}
        className="text-[12.5px] font-medium text-gold underline-offset-2 transition hover:text-ink hover:underline"
      >
        {ui.suggestionsHint}
      </a>
    </div>
  );
}

export function SuggestionsTopBanner({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <a
      href={SUGGESTIONS_DISPLAY_URL}
      className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/70 px-4 py-3 transition hover:border-gold/50 hover:bg-white"
    >
      <div className="min-w-0">
        <p className="font-serif text-lg leading-none text-ink">{ui.suggestionsCardTitle}</p>
        <p className="mt-1 text-[12.5px] text-muted">{ui.suggestionsCardSubtitle}</p>
      </div>
      <span className="shrink-0 text-gold" aria-hidden>
        <ChevronIcon />
      </span>
    </a>
  );
}

export function SuggestionsFishCard({ locale }: { locale: MenuLocale }) {
  const ui = tUi(locale);
  return (
    <a
      href={SUGGESTIONS_DISPLAY_URL}
      className="flex items-center justify-between gap-3 rounded-xl border border-gold bg-gradient-to-br from-ink via-[#244A3A] to-[#8F6A24] px-4 py-4 shadow-[0_8px_24px_rgba(30,58,47,0.18)] transition hover:brightness-105"
    >
      <div className="min-w-0">
        <p className="font-serif text-xl leading-none text-white">{ui.suggestionsCardTitle}</p>
        <p className="mt-1.5 text-[13px] text-[#F4EBD8]/90">{ui.suggestionsCardSubtitle}</p>
      </div>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
        aria-hidden
      >
        <ChevronIcon />
      </span>
    </a>
  );
}
