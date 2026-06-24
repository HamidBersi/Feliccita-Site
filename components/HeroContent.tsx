"use client";

import HeroFadeIn from "@/components/HeroFadeIn";
import StickyHeroCta from "@/components/StickyHeroCta";

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
        <div className="mt-6 mb-8 w-full shrink-0 md:mb-10 lg:mb-12">
          <StickyHeroCta order={order} reserve={reserve} />
        </div>
      </HeroFadeIn>
    </div>
  );
}
