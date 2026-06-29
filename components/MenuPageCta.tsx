"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import HeroCtaButtons from "@/components/HeroCtaButtons";

export default function MenuPageCta() {
  const t = useTranslations("Hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-border/60 bg-white/92 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] backdrop-blur-lg supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="px-4 py-3 sm:px-6">
        <HeroCtaButtons order={t("order")} reserve={t("reserve")} variant="floating" />
      </div>
    </div>,
    document.body,
  );
}
