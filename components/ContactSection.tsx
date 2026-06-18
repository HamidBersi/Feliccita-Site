import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import {
  FacebookBrandIcon,
  GoogleBrandIcon,
  InstagramBrandIcon,
  TikTokBrandIcon,
} from "@/components/SocialBrandIcons";
import {
  FACEBOOK_URL,
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_MAPS_REVIEWS_URL,
  INSTAGRAM_URL,
  ORDER_URL,
  PHONE_HREF,
  TIKTOK_URL,
} from "@/lib/constants";
import { formatGoogleRating, getGooglePlaceData } from "@/lib/google-place";
import { Link } from "@/i18n/navigation";

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.58 7-12.5A7 7 0 1 0 5 9.5C5 15.42 12 22 12 22z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6H21L19 14H8L6 6ZM6 6L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-[0_3px_12px_rgba(196,154,42,0.35)]">
      {children}
    </div>
  );
}

function GoldLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "mt-1 inline-flex items-center gap-1 text-xs font-medium text-gold transition-opacity hover:opacity-80";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function ContactRow({
  icon,
  title,
  text,
  linkHref,
  linkLabel,
  external,
  withDivider = true,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  linkHref: string;
  linkLabel: string;
  external?: boolean;
  withDivider?: boolean;
}) {
  return (
    <div className={`flex gap-3 py-3 ${withDivider ? "border-b border-black/8" : ""}`}>
      <IconBadge>{icon}</IconBadge>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-sm text-ink">{title}</h3>
        <p className="mt-0.5 text-xs leading-snug text-muted">{text}</p>
        <GoldLink href={linkHref} external={external}>
          {linkLabel}
          <span aria-hidden="true">→</span>
        </GoldLink>
      </div>
    </div>
  );
}

export default async function ContactSection() {
  const locale = await getLocale();
  const t = await getTranslations("Contact");
  const googlePlace = await getGooglePlaceData();
  const ratingLabel = formatGoogleRating(googlePlace.rating, locale);
  const reviewCountLabel = new Intl.NumberFormat(locale).format(googlePlace.reviewCount);

  const socialLinks: { href?: string; label: string; icon: ReactNode }[] = [
    {
      href: INSTAGRAM_URL || undefined,
      label: t("social.instagram"),
      icon: <InstagramBrandIcon className="h-5 w-5" />,
    },
    {
      href: TIKTOK_URL || undefined,
      label: t("social.tiktok"),
      icon: <TikTokBrandIcon className="h-5 w-5" />,
    },
    {
      href: GOOGLE_MAPS_REVIEWS_URL,
      label: t("social.google"),
      icon: <GoogleBrandIcon className="h-5 w-5" />,
    },
    {
      href: FACEBOOK_URL,
      label: t("social.facebook"),
      icon: <FacebookBrandIcon className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-[68px] bg-cream px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">{t("title")}</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex min-h-[220px] flex-col rounded-xl border border-black/8 bg-white px-4 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:min-h-[240px] sm:rounded-2xl sm:px-5">
            <ContactRow
              icon={<PinIcon />}
              title={t("address.title")}
              text={t("address.text")}
              linkHref={GOOGLE_MAPS_PLACE_URL}
              linkLabel={t("address.link")}
              external
            />
            <ContactRow
              icon={<PhoneIcon />}
              title={t("phone.title")}
              text={t("phone.text")}
              linkHref={PHONE_HREF}
              linkLabel={t("phone.link")}
            />
            <ContactRow
              icon={<ClockIcon />}
              title={t("hours.title")}
              text={t("hours.text")}
              linkHref="/horaires"
              linkLabel={t("hours.link")}
              withDivider={false}
            />

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/8 py-3">
              <p className="text-xs font-medium text-ink">{t("social.title")}</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) =>
                  social.href ? (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="transition-transform hover:scale-105"
                    >
                      {social.icon}
                    </a>
                  ) : (
                    <span
                      key={social.label}
                      aria-label={social.label}
                      className="cursor-default opacity-40"
                      title={social.label}
                    >
                      {social.icon}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:min-h-[240px] sm:rounded-2xl">
            <iframe
              title={t("mapTitle")}
              src="https://maps.google.com/maps?q=La+Felicita+Furdenheim&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-lg bg-white/95 px-2.5 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]"
            >
              <p className="font-serif text-xs font-medium text-ink">La Félicità</p>
              <p className="mt-0.5 text-[11px] text-muted">{t("address.text")}</p>
              {googlePlace.reviewCount > 0 ? (
                <p className="mt-1 text-[11px] font-medium text-gold">
                  {t("mapReviews", { rating: ratingLabel, count: reviewCountLabel })}
                </p>
              ) : (
                <p className="mt-1 text-[11px] font-medium text-gold">
                  {t("mapRating", { rating: ratingLabel })}
                </p>
              )}
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-2.5 text-xs font-medium text-white shadow-[0_4px_16px_rgba(196,154,42,0.3)] transition-opacity hover:opacity-90"
          >
            <CartIcon />
            {t("orderCta")}
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-lg border border-gold bg-transparent px-4 py-2.5 text-xs font-medium text-gold transition-colors hover:bg-gold/5"
          >
            <PhoneIcon />
            {t("callCta")}
          </a>
        </div>

        <p className="mt-4 text-center text-xs italic text-muted">
          <span aria-hidden="true">❤️ </span>
          {t("thanks")}
        </p>
      </div>
    </section>
  );
}
