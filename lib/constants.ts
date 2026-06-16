export const ORDER_URL =
  "https://lafelicitafurdenheim.order.app.hd.digital/menus";

export const PHONE_HREF = "tel:+33388373217";

export const RESERVATION_WIDGET_ID =
  "hydra-8c8afeac-e737-4141-9d1d-03714c868490";

const RESERVATION_LOCALES: Record<string, string> = {
  fr: "fr",
  en: "en",
  de: "de",
};

export function getReservationUrl(locale: string): string {
  const lang = RESERVATION_LOCALES[locale] ?? "fr";
  return `https://reservation.dish.co/widget/${RESERVATION_WIDGET_ID}?lang=${lang}`;
}

export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/La+Felicita/@48.6113991,7.5512431,17z/data=!3m1!4b1!4m6!3m5!1s0x4796b1509c1f4131:0x2bea8a64107ff1e2!8m2!3d48.6113991!4d7.553818!16s%2Fg%2F11g0zry3bj?entry=ttu";

export const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/place/La+Felicita/@48.6113991,7.5512431,17z/data=!4m17!1m8!3m7!1s0x4796b1509c1f4131:0x2bea8a64107ff1e2!2sLa+Felicita!8m2!3d48.6113991!4d7.553818!10e1!16s%2Fg%2F11g0zry3bj!3m7!1s0x4796b1509c1f4131:0x2bea8a64107ff1e2!8m2!3d48.6113991!4d7.553818!9m1!1b1!16s%2Fg%2F11g0zry3bj?entry=ttu";
