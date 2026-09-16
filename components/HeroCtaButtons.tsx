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
  "group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-gold px-4 py-2 text-[13px] font-semibold tracking-wide text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_18px_rgba(196,154,42,0.45)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_8px_22px_rgba(196,154,42,0.55)] active:translate-y-0 sm:px-5 sm:text-sm [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-110";

const reserveHeroClassName =
  "group inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-white px-4 py-2 text-[13px] font-semibold tracking-wide text-ink shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-gold-bg hover:shadow-[0_8px_22px_rgba(0,0,0,0.22)] active:translate-y-0 sm:px-5 sm:text-sm [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-110";

const orderFloatingClassName =
  "group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-gold px-3.5 py-2 text-[13px] font-semibold tracking-wide text-white shadow-[0_4px_14px_rgba(196,154,42,0.4)] transition-all duration-200 ease-out hover:bg-[#d4aa35] hover:shadow-[0_6px_18px_rgba(196,154,42,0.5)] active:translate-y-0 sm:px-5 [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-110";

const reserveFloatingClassName =
  "group inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-ink px-3.5 py-2 text-[13px] font-semibold tracking-wide text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out hover:bg-dark active:translate-y-0 sm:px-5 [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-110";

type HeroCtaButtonsProps = {
  order: string;
  reserve: string;
  variant: "hero" | "floating";
};

export default function HeroCtaButtons({ order, reserve, variant }: HeroCtaButtonsProps) {
  const isHero = variant === "hero";
  const iconSize = 16;

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
      <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:justify-start">
        {buttons}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {buttons}
    </div>
  );
}
