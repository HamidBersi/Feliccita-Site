import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import GoogleStars from "@/components/GoogleStars";
import OpeningHoursCell from "@/components/OpeningHoursCell";
import { ORDER_URL, GOOGLE_MAPS_PLACE_URL, GOOGLE_MAPS_REVIEWS_URL } from "@/lib/constants";
import {
  formatGoogleRating,
  getGooglePlaceData,
} from "@/lib/google-place";
import { getWeeklySchedule } from "@/lib/opening-hours";
import { Link } from "@/i18n/navigation";

function StarIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L14.9 8.6L22 9.3L17 14.1L18.2 21.2L12 17.8L5.8 21.2L7 14.1L2 9.3L9.1 8.6L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8V12L14.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TakeAwayIcon() {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 11v8.5a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19.5V11" />
      <path d="M6 11h12" />
      <path d="M7.5 11V8.5C7.5 7.2 8.4 6.5 9.25 6.5C10.1 6.5 11 7.2 11 8.5V11" />
      <path d="M13 11V8.5C13 7.2 13.9 6.5 14.75 6.5C15.6 6.5 16.5 7.2 16.5 8.5V11" />
    </svg>
  );
}

type InfoItemProps = {
  href: string;
  icon: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  external?: boolean;
  internal?: boolean;
  className?: string;
};

function InfoItem({
  href,
  icon,
  title,
  subtitle,
  children,
  external = false,
  internal = false,
  className = "",
}: InfoItemProps) {
  const itemClassName = `group flex items-center gap-2 rounded-md border border-black/10 bg-white/60 px-2 py-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/95 hover:shadow-[0_8px_24px_rgba(196,154,42,0.15)] sm:gap-2.5 sm:rounded-lg sm:px-3 sm:py-3 lg:rounded-none lg:border-0 lg:border-r lg:border-black/10 lg:bg-transparent lg:px-4 lg:py-3.5 lg:last:border-r-0 lg:hover:bg-white/70 lg:hover:shadow-none ${className}`;

  const content = (
    <>
      <div className="shrink-0 text-gold transition-transform duration-300 group-hover:scale-110 [&_svg]:h-7 [&_svg]:w-7 lg:[&_svg]:h-[35px] lg:[&_svg]:w-[35px]">
        {icon}
      </div>
      <div className="min-w-0">
        {children ?? (
          <>
            <p className="text-[11px] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-gold sm:text-[13px] sm:leading-snug">
              {title}
            </p>
            <div className="mt-px text-[9px] leading-tight text-muted transition-colors duration-300 group-hover:text-ink/70 sm:mt-0.5 sm:text-[11px] sm:leading-snug">
              {subtitle}
            </div>
          </>
        )}
      </div>
    </>
  );

  if (internal) {
    return (
      <Link href={href} className={itemClassName}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={itemClassName}
    >
      {content}
    </a>
  );
}

export default async function InfoStrip() {
  const t = await getTranslations("InfoStrip");
  const locale = await getLocale();
  const googlePlace = await getGooglePlaceData();
  const schedule = await getWeeklySchedule();
  const ratingLabel = formatGoogleRating(googlePlace.rating, locale);

  return (
    <div
      className="hero-fade-up mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-black/12 bg-white/88 p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:rounded-xl sm:p-2.5 sm:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:p-3 lg:rounded-lg lg:p-0"
      style={{ animationDelay: "700ms" }}
    >
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 lg:grid-cols-5 lg:gap-0">
        <InfoItem
          href={GOOGLE_MAPS_REVIEWS_URL}
          external
          icon={<StarIcon />}
          title={t("rating.title", { rating: ratingLabel })}
          subtitle={<GoogleStars rating={googlePlace.rating} />}
        />
        <InfoItem
          href={GOOGLE_MAPS_PLACE_URL}
          external
          icon={<PinIcon />}
          title={t("location.title")}
          subtitle={t("location.subtitle")}
        />
        <InfoItem
          href="tel:+33388373217"
          icon={<PhoneIcon />}
          title={t("phone.title")}
          subtitle={t("phone.subtitle")}
        />
        <InfoItem href="/horaires" internal icon={<ClockIcon />}>
          <OpeningHoursCell
            schedule={schedule}
            locale={locale}
            labels={{
              open: t("hours.open"),
              closed: t("hours.closed"),
              closedToday: t("hours.closedToday"),
            }}
          />
        </InfoItem>
        <InfoItem
          href={ORDER_URL}
          external
          icon={<TakeAwayIcon />}
          title={t("takeaway.title")}
          subtitle={t("takeaway.subtitle")}
          className="col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  );
}
