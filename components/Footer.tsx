import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark px-5 py-4 text-white sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 text-center">
        <p className="font-serif text-base text-white sm:text-lg">La Félicità</p>
        <p className="text-[10px] text-white/45 sm:text-[11px]">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
