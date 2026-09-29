"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type HScrollRowProps = {
  children: ReactNode;
  className?: string;
  fadeFromClass?: string;
};

export function HScrollRow({
  children,
  className = "",
  fadeFromClass = "from-cream",
}: HScrollRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(max > 8 && el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    update();
    const raf = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children, update]);

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className="relative w-full min-w-0">
      <div
        ref={scrollerRef}
        className={`flex w-full min-w-0 flex-nowrap overflow-x-auto overscroll-x-contain touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>
      {canScrollLeft ? (
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex w-11 items-center justify-start bg-gradient-to-r ${fadeFromClass} to-transparent pl-0.5`}
        >
          <button
            type="button"
            aria-label="Faire défiler vers la gauche"
            onClick={() => scrollBy(-140)}
            className="pointer-events-auto flex size-7 items-center justify-center rounded-full bg-ink/85 text-white shadow-sm"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
      {canScrollRight ? (
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 flex w-11 items-center justify-end bg-gradient-to-l ${fadeFromClass} to-transparent pr-0.5`}
        >
          <button
            type="button"
            aria-label="Faire défiler vers la droite"
            onClick={() => scrollBy(140)}
            className="pointer-events-auto flex size-7 items-center justify-center rounded-full bg-ink/85 text-white shadow-sm"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
