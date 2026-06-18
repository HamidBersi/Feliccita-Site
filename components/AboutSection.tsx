import { getTranslations } from "next-intl/server";

export default async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section
      id="about"
      className="scroll-mt-[68px] bg-cream px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:mt-3 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-6 sm:text-lg">
          {t("lead")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
