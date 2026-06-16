import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative h-svh max-h-svh overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh">
      <Hero />
      <Navbar />
    </div>
  );
}
