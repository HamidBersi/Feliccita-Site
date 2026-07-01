import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroContent from "@/components/HeroContent";
import InfoStrip from "@/components/InfoStrip";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex h-full min-h-0 flex-col overflow-hidden pt-[68px]">
      <Image
        src="/images/Hero.jpg"
        alt={t("imageAlt")}
        fill
        priority
        fetchPriority="high"
        quality={80}
        className="object-cover object-[center_30%] brightness-105 lg:object-[65%_center]"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20 lg:bg-gradient-to-r lg:from-black/85 lg:from-0% lg:via-black/55 lg:via-50% lg:to-black/10 lg:to-100%"
        aria-hidden="true"
      />

      <HeroContent
        title={t("title")}
        titleLocation={t("titleLocation")}
        subtitle={t("subtitle")}
        order={t("order")}
        reserve={t("reserve")}
      />

      {/* Grille info en bas — tous breakpoints */}
      <div className="relative z-20 shrink-0 px-4 pb-4 pt-3 sm:px-6 md:px-10 lg:px-10 lg:pb-5">
        <InfoStrip />
      </div>
    </section>
  );
}
