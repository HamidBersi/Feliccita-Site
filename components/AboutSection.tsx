import { getTranslations } from "next-intl/server";

export default async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section id="about" className="scroll-mt-[68px] bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {t("lead")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {t("body")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {t("closing")}
        </p>
      </div>
    </section>
  );
}
