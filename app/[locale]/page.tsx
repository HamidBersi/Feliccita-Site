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
    <div className="lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <Navbar />
      <div className="lg:min-h-0 lg:flex-1">
        <Hero />
      </div>
    </div>
  );
}
