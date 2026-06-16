import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroContent from "@/components/HeroContent";
import InfoStrip from "@/components/InfoStrip";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative -mt-[68px] flex min-h-screen flex-col pt-[68px] lg:-mt-[68px] lg:h-full lg:min-h-0 lg:max-h-full lg:overflow-hidden lg:pt-[68px]">
      <Image
        src="/images/Hero.jpg"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center brightness-105"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20 lg:bg-gradient-to-r lg:from-black/80 lg:from-0% lg:via-black/45 lg:via-45% lg:to-transparent lg:to-80%"
        aria-hidden="true"
      />

      <HeroContent
        title={t("title")}
        titleLocation={t("titleLocation")}
        subtitle={t("subtitle")}
        order={t("order")}
        reserve={t("reserve")}
      />

      {/* Mobile + tablette : grille en flux */}
      <div className="relative z-20 mt-10 px-4 pb-6 sm:px-6 md:mt-8 md:px-10 md:pb-10 lg:hidden">
        <InfoStrip />
      </div>

      {/* Desktop : grille intégrée en bas, sans débordement */}
      <div className="relative z-20 hidden shrink-0 px-10 pb-6 lg:block">
        <InfoStrip />
      </div>
    </section>
  );
}
