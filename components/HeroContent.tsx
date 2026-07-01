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
    <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:px-8 md:px-12 lg:items-start lg:px-16 lg:py-10 xl:px-24 lg:text-left">
      <div className="w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[min(52vw,720px)]">
        <HeroFadeIn delay={100}>
          <h1 className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            <span className="block font-serif text-[26px] font-normal leading-[1.15] text-white sm:text-[28px] md:text-[44px] lg:text-[52px] xl:text-[58px]">
              {title}
            </span>
            <span className="mt-3 block font-sans text-[16px] font-light tracking-wide text-white/85 md:mt-3 md:text-[22px] lg:mt-4 lg:text-[26px]">
              {titleLocation}
            </span>
          </h1>
        </HeroFadeIn>

        <HeroFadeIn delay={400}>
          <p className="mx-auto mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:mt-5 md:text-base lg:mx-0 lg:mt-6 lg:max-w-none lg:text-lg lg:leading-relaxed xl:text-xl">
            {subtitle}
          </p>
        </HeroFadeIn>

        <HeroFadeIn delay={550}>
          <div className="mt-7 w-full sm:mt-8 lg:mt-10">
            <StickyHeroCta order={order} reserve={reserve} />
          </div>
        </HeroFadeIn>
      </div>
    </div>
  );
}
