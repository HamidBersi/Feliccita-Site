"use client";

import ReservationButton from "@/components/ReservationButton";
import { ORDER_URL } from "@/lib/constants";

function CartIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6H21L19 14H8L6 6ZM6 6L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 3V7M16 3V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const orderHeroClassName =
  "group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gold px-7 py-2.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_12px_32px_rgba(196,154,42,0.5)] active:translate-y-0 md:w-auto md:px-9 md:py-2.5 md:text-sm lg:px-10 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110";

const reserveHeroClassName =
  "group inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-[1.5px] border-white bg-white/5 px-7 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:bg-white hover:text-ink hover:shadow-[0_12px_32px_rgba(255,255,255,0.18)] active:translate-y-0 md:w-auto md:px-9 md:py-2.5 md:text-sm lg:px-10 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110";

const orderFloatingClassName =
  "group inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-gold px-4 py-2.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_8px_24px_rgba(196,154,42,0.45)] active:translate-y-0 sm:flex-none sm:px-7 sm:text-sm [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110";

const reserveFloatingClassName =
  "group inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-ink/15 bg-cream/80 px-4 py-2.5 text-xs font-medium text-ink transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:bg-gold-bg active:translate-y-0 sm:flex-none sm:px-7 sm:text-sm [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110";

type HeroCtaButtonsProps = {
  order: string;
  reserve: string;
  variant: "hero" | "floating";
};

export default function HeroCtaButtons({ order, reserve, variant }: HeroCtaButtonsProps) {
  const isHero = variant === "hero";
  const iconSize = isHero ? 18 : 16;

  const buttons = (
    <>
      <a
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={isHero ? orderHeroClassName : orderFloatingClassName}
      >
        <CartIcon size={iconSize} />
        {order}
      </a>

      <ReservationButton
        className={isHero ? reserveHeroClassName : reserveFloatingClassName}
      >
        <CalendarIcon size={iconSize} />
        {reserve}
      </ReservationButton>
    </>
  );

  if (isHero) {
    return (
      <div className="flex w-full max-w-xs flex-col gap-2.5 sm:max-w-sm md:max-w-none md:flex-row md:gap-4">
        {buttons}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg gap-2 sm:max-w-xl sm:justify-center sm:gap-3">
      {buttons}
    </div>
  );
}
