import Navbar from "@/components/Navbar";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      {/* Les autres sections arrivent étape par étape */}
    </>
  );
}
