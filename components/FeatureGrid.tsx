"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { DAILY_SUGGESTIONS_URL, ORDER_URL } from "@/lib/constants";
import { GALLERY_IMAGES } from "@/lib/gallery-images";

type CardConfig = {
  id: string;
  type: "expand" | "link" | "gallery" | "dual";
  image?: string;
  imageAltKey: string;
  icon: ReactNode;
  titleKey: string;
  textKey: string;
  textFullKey?: string;
  linkKey?: string;
  learnMoreKey?: string;
  href?: string;
};

function PizzaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 10h.01M14 8h.01M16 13h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PastaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12c2-4 5-6 8-6s6 2 8 6c-2 4-5 6-8 6s-6-2-8-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TerraceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 20V10l6-4 6 4v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 6v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 11v8.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 11h12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8.5A4 4 0 0 1 16 8.5V11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DailyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M21 15l-4.5-4.5a1.5 1.5 0 0 0-2.12 0L5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GallerySlider({
  slideIndex,
  onPrev,
  onNext,
  onGoTo,
  onClose,
}: {
  slideIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onClose: () => void;
}) {
  const t = useTranslations("FeatureGrid");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, onClose]);

  const currentSrc = GALLERY_IMAGES[slideIndex];

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col bg-black"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 supports-[padding:max(0px)]:pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:py-4">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-lg text-white sm:text-2xl">
            {t("gallery.title")}
          </h3>
          <p className="mt-0.5 text-xs text-white/55 sm:text-sm">
            {t("gallery.counter", { current: slideIndex + 1, total: GALLERY_IMAGES.length })}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label={t("close")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Image
          key={currentSrc}
          src={currentSrc}
          alt={t("gallery.photoAlt", { number: slideIndex + 1 })}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:left-5 sm:h-12 sm:w-12"
          aria-label={t("gallery.prev")}
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:right-5 sm:h-12 sm:w-12"
          aria-label={t("gallery.next")}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2 px-4 py-4 supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))] sm:py-5">
        {GALLERY_IMAGES.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => onGoTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === slideIndex ? "w-6 bg-gold" : "w-2 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={t("gallery.goTo", { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}

export default function FeatureGridClient() {
  const t = useTranslations("FeatureGrid");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expandedId && !galleryOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedId, galleryOpen]);

  function openGallery() {
    setGallerySlide(0);
    setGalleryOpen(true);
  }

  function closeGallery() {
    setGalleryOpen(false);
    setGallerySlide(0);
  }

  function goToPrevSlide() {
    setGallerySlide((current) =>
      current === 0 ? GALLERY_IMAGES.length - 1 : current - 1,
    );
  }

  function goToNextSlide() {
    setGallerySlide((current) =>
      current === GALLERY_IMAGES.length - 1 ? 0 : current + 1,
    );
  }

  const cards: CardConfig[] = [
    {
      id: "pizza",
      type: "expand",
      image: "/images/Pizza-Grille1.jpg",
      imageAltKey: "pizza.imageAlt",
      icon: <PizzaIcon />,
      titleKey: "pizza.title",
      textKey: "pizza.text",
      textFullKey: "pizza.textFull",
      linkKey: "pizza.link",
    },
    {
      id: "pasta",
      type: "expand",
      image: "/images/Pâtes_Grille2.jpg",
      imageAltKey: "pasta.imageAlt",
      icon: <PastaIcon />,
      titleKey: "pasta.title",
      textKey: "pasta.text",
      textFullKey: "pasta.textFull",
      linkKey: "pasta.link",
    },
    {
      id: "daily",
      type: "dual",
      image: "/images/Suggestion_Grille3.png",
      imageAltKey: "daily.imageAlt",
      icon: <DailyIcon />,
      titleKey: "daily.title",
      textKey: "daily.text",
      textFullKey: "daily.textFull",
      linkKey: "daily.link",
      learnMoreKey: "daily.learnMore",
      href: DAILY_SUGGESTIONS_URL,
    },
    {
      id: "terrace",
      type: "expand",
      image: "/images/Terrasse_Grille3.jpg",
      imageAltKey: "terrace.imageAlt",
      icon: <TerraceIcon />,
      titleKey: "terrace.title",
      textKey: "terrace.text",
      linkKey: "terrace.link",
    },
    {
      id: "takeaway",
      type: "link",
      image: "/images/Emporter_Grille4.png",
      imageAltKey: "takeaway.imageAlt",
      icon: <BagIcon />,
      titleKey: "takeaway.title",
      textKey: "takeaway.text",
      linkKey: "takeaway.link",
      href: ORDER_URL,
    },
    {
      id: "gallery",
      type: "gallery",
      image: GALLERY_IMAGES[0],
      imageAltKey: "gallery.cardImageAlt",
      icon: <GalleryIcon />,
      titleKey: "gallery.title",
      textKey: "gallery.text",
      linkKey: "gallery.link",
    },
  ];

  const expandedCard = cards.find((card) => card.id === expandedId);

  const cardOverlay =
    mounted && expandedCard
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <button
              type="button"
              className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
              aria-label={t("close")}
              onClick={() => setExpandedId(null)}
            />

            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              {expandedCard.image ? (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={expandedCard.image}
                    alt={t(expandedCard.imageAltKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              ) : null}
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-2xl text-ink sm:text-3xl">
                  {t(expandedCard.titleKey)}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {t(expandedCard.textFullKey ?? expandedCard.textKey)}
                </p>
                {expandedCard.href && expandedCard.linkKey ? (
                  <a
                    href={expandedCard.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4aa35] hover:shadow-[0_8px_24px_rgba(196,154,42,0.45)] sm:text-base"
                  >
                    {t(expandedCard.linkKey)}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  const galleryOverlay =
    mounted && galleryOpen
      ? createPortal(
          <div className="fixed inset-0 z-[9999]">
            <button
              type="button"
              className="absolute inset-0 bg-black"
              aria-label={t("close")}
              onClick={closeGallery}
            />
            <GallerySlider
              slideIndex={gallerySlide}
              onPrev={goToPrevSlide}
              onNext={goToNextSlide}
              onGoTo={setGallerySlide}
              onClose={closeGallery}
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <section
        id="reviews"
        className="scroll-mt-[68px] bg-[#f3efe6] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center sm:mb-8 lg:mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:mt-3 sm:text-4xl">
              {t("title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {cards.map((card) => {
              const content = (
                <>
                  {card.image ? (
                    <div
                      className={`relative aspect-[21/9] overflow-hidden sm:aspect-[2/1] ${
                        card.type === "gallery" ? "bg-cream" : ""
                      }`}
                    >
                      <Image
                        src={card.image}
                        alt={t(card.imageAltKey)}
                        fill
                        className={
                          card.type === "gallery"
                            ? "object-contain p-1"
                            : "object-cover transition-transform duration-500 group-hover:scale-105"
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {card.type === "gallery" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-lg">
                            {t("gallery.badge", { count: GALLERY_IMAGES.length })}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="relative px-3 pb-2.5 pt-5 sm:px-3.5 sm:pb-3 sm:pt-5">
                    <div className="absolute -top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white shadow-[0_3px_12px_rgba(196,154,42,0.35)]">
                      {card.icon}
                    </div>

                    <h3 className="line-clamp-2 font-serif text-[14px] leading-tight text-ink sm:text-[15px]">
                      {t(card.titleKey)}
                    </h3>
                    <p className="mt-1 line-clamp-2 hidden text-[11px] leading-snug text-muted sm:block sm:text-xs">
                      {t(card.textKey)}
                    </p>

                    {card.linkKey && card.type !== "dual" ? (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-gold sm:mt-2 sm:text-xs">
                        {t(card.linkKey)}
                        <span className="text-gold" aria-hidden="true">
                          →
                        </span>
                      </span>
                    ) : null}
                  </div>
                </>
              );

              const cardClassName =
                "group relative flex flex-col overflow-hidden rounded-xl border border-black/8 bg-white text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(196,154,42,0.15)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:rounded-2xl";

              if (card.type === "link" && card.href) {
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {content}
                  </a>
                );
              }

              if (card.type === "gallery") {
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={openGallery}
                    className={cardClassName}
                  >
                    {content}
                  </button>
                );
              }

              if (card.type === "dual" && card.href) {
                return (
                  <div key={card.id} className={cardClassName}>
                    {content}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3 pb-3 sm:px-3.5 sm:pb-3.5">
                      {card.linkKey ? (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-gold transition-opacity hover:opacity-80 sm:text-xs"
                        >
                          {t(card.linkKey)}
                          <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                      {card.learnMoreKey ? (
                        <button
                          type="button"
                          onClick={() => setExpandedId(card.id)}
                          className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-muted transition-colors hover:text-ink sm:text-xs"
                        >
                          {t(card.learnMoreKey)}
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setExpandedId(card.id)}
                  className={cardClassName}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {cardOverlay}
      {galleryOverlay}
    </>
  );
}
