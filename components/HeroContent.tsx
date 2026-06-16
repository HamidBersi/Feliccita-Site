"use client";

import HeroFadeIn from "@/components/HeroFadeIn";
import ReservationButton from "@/components/ReservationButton";
import { ORDER_URL } from "@/lib/constants";

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

type HeroContentProps = {
  title: string;
  titleLocation: string;
  subtitle: string;
  order: string;
  reserve: string;
};

export default function HeroContent({
  title,
  titleLocation,
  subtitle,
  order,
  reserve,
}: HeroContentProps) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center px-6 pb-2 pt-10 text-center sm:px-8 md:px-12 md:pt-8 lg:items-start lg:px-20 lg:pt-4 lg:text-left">
      <div className="flex min-h-0 w-full max-w-[520px] flex-1 flex-col justify-center lg:max-w-[560px] lg:justify-start lg:pt-2">
        <HeroFadeIn delay={100}>
          <h1 className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            <span className="block font-serif text-[26px] font-normal leading-[1.2] text-white sm:text-[28px] md:text-[44px]">
              {title}
            </span>
            <span className="mt-3 block font-sans text-[16px] font-light tracking-wide text-white/80 md:mt-3 md:text-[22px]">
              {titleLocation}
            </span>
          </h1>
        </HeroFadeIn>

        <HeroFadeIn delay={400}>
          <p className="mx-auto mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:mt-5 md:text-base lg:mx-0">
            {subtitle}
          </p>
        </HeroFadeIn>
      </div>

      <HeroFadeIn delay={550}>
        <div className="mt-6 mb-8 flex w-full max-w-xs shrink-0 flex-col gap-2.5 sm:max-w-sm md:mb-10 md:max-w-none md:flex-row md:gap-4 lg:mb-12">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gold px-7 py-2.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_12px_32px_rgba(196,154,42,0.5)] active:translate-y-0 md:w-auto md:px-9 md:py-2.5 md:text-sm lg:px-10 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110"
          >
            <CartIcon />
            {order}
          </a>

          <ReservationButton className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-[1.5px] border-white bg-white/5 px-7 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:bg-white hover:text-ink hover:shadow-[0_12px_32px_rgba(255,255,255,0.18)] active:translate-y-0 md:w-auto md:px-9 md:py-2.5 md:text-sm lg:px-10 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110">
            <CalendarIcon />
            {reserve}
          </ReservationButton>
        </div>
      </HeroFadeIn>
    </div>
  );
}
