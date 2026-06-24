"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HeroCtaButtons from "@/components/HeroCtaButtons";

type StickyHeroCtaProps = {
  order: string;
  reserve: string;
};

export default function StickyHeroCta({ order, reserve }: StickyHeroCtaProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const anchor = anchorRef.current;
    if (!anchor) {
      return;
    }

    let observer: IntersectionObserver;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFloating(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "-8px 0px 0px 0px" },
      );

      observer.observe(anchor);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [mounted]);

  const floatingBar = (
    <div
      className={`fixed inset-x-0 bottom-0 z-[90] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFloating
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[calc(100%+1rem)] opacity-0"
      }`}
      aria-hidden={!isFloating}
    >
      <div
        className={`border-t border-border/60 bg-white/92 px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] backdrop-blur-lg transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 ${
          isFloating ? "scale-100" : "scale-[0.98]"
        }`}
      >
        <HeroCtaButtons order={order} reserve={reserve} variant="floating" />
      </div>
    </div>
  );

  return (
    <>
      <div ref={anchorRef}>
        <HeroCtaButtons order={order} reserve={reserve} variant="hero" />
      </div>

      {mounted ? createPortal(floatingBar, document.body) : null}
    </>
  );
}
