import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FeatureGridSection from "@/components/FeatureGridSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import VacationModal from "@/components/VacationModal";
import { getVacationDisplay } from "@/lib/vacation";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tVacation = await getTranslations("Vacation");
  const vacation = getVacationDisplay(locale, {
    shortTitle: tVacation("shortTitle"),
    pageTitle: tVacation("pageTitle"),
    formatReopening: (date) => tVacation("reopening", { date }),
    formatDefaultMessage: (date) => tVacation("defaultMessage", { date }),
  });

  return (
    <>
      <div className="relative h-svh max-h-svh overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh">
        <Hero />
        <Navbar />
      </div>
      <AboutSection />
      <FeatureGridSection />
      <ContactSection />
      {vacation ? (
        <VacationModal
          vacation={vacation}
          dismissLabel={tVacation("modalDismiss")}
          storageKey={`felicita-vacation-modal-${process.env.VACATION_UNTIL?.trim() ?? "active"}`}
        />
      ) : null}
    </>
  );
}
