import { getTranslations } from "next-intl/server";
import ReservationButton from "@/components/ReservationButton";
import {
  GOOGLE_MAPS_PLACE_URL,
  ORDER_URL,
  PHONE_HREF,
} from "@/lib/constants";
import { Link } from "@/i18n/navigation";

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const cardClassName =
  "group flex h-full flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(196,154,42,0.12)]";

export default async function ContactSection() {
  const t = await getTranslations("Contact");

  const cards = [
    {
      id: "address",
      icon: <PinIcon />,
      title: t("address.title"),
      text: t("address.text"),
      href: GOOGLE_MAPS_PLACE_URL,
      link: t("address.link"),
      external: true as const,
    },
    {
      id: "phone",
      icon: <PhoneIcon />,
      title: t("phone.title"),
      text: t("phone.text"),
      href: PHONE_HREF,
      link: t("phone.link"),
      external: false as const,
    },
    {
      id: "hours",
      icon: <ClockIcon />,
      title: t("hours.title"),
      text: t("hours.text"),
      href: "/horaires",
      link: t("hours.link"),
      external: false as const,
    },
    {
      id: "reserve",
      icon: <CalendarIcon />,
      title: t("reserve.title"),
      text: t("reserve.text"),
      link: t("reserve.link"),
      isReservation: true as const,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-[68px] bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center lg:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {cards.map((card) => {
              const iconBadge = (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-[0_4px_16px_rgba(196,154,42,0.35)]">
                  {card.icon}
                </div>
              );

              if ("isReservation" in card) {
                return (
                  <ReservationButton
                    key={card.id}
                    className={`${cardClassName} cursor-pointer text-left`}
                  >
                    {iconBadge}
                    <h3 className="font-serif text-lg text-ink">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors group-hover:text-ink">
                      {card.link}
                      <span aria-hidden="true">→</span>
                    </span>
                  </ReservationButton>
                );
              }

              if (card.external) {
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {iconBadge}
                    <h3 className="font-serif text-lg text-ink">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors group-hover:text-ink">
                      {card.link}
                      <span aria-hidden="true">→</span>
                    </span>
                  </a>
                );
              }

              if (card.href.startsWith("tel:")) {
                return (
                  <a key={card.id} href={card.href} className={cardClassName}>
                    {iconBadge}
                    <h3 className="font-serif text-lg text-ink">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors group-hover:text-ink">
                      {card.link}
                      <span aria-hidden="true">→</span>
                    </span>
                  </a>
                );
              }

              return (
                <Link key={card.id} href={card.href} className={cardClassName}>
                  {iconBadge}
                  <h3 className="font-serif text-lg text-ink">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors group-hover:text-ink">
                    {card.link}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <iframe
              title={t("mapTitle")}
              src="https://maps.google.com/maps?q=La+Felicita+Furdenheim&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="aspect-[4/3] h-full min-h-[280px] w-full lg:min-h-full lg:aspect-auto"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("orderCta")}
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center rounded-md border border-gold/40 bg-white px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
          >
            {t("callCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
