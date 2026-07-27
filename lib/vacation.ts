const PARIS_TZ = "Europe/Paris";

export type VacationDisplay = {
  shortTitle: string;
  shortSubtitle: string;
  pageTitle: string;
  messageLines: string[];
};

export type VacationLabels = {
  shortTitle: string;
  pageTitle: string;
  formatReopening: (date: string) => string;
  formatDefaultMessage: (date: string) => string;
};

function getParisTodayYmd(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: PARIS_TZ }).format(new Date());
}

function parseReopenDate(): string | null {
  const raw = process.env.VACATION_UNTIL?.trim();
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return null;
  }
  return raw;
}

function isVacationActive(reopenYmd: string): boolean {
  // VACATION_UNTIL = date de réouverture : actif jusqu'à la veille inclusive.
  return getParisTodayYmd() < reopenYmd;
}

function formatReopenDate(reopenYmd: string, locale: string): string {
  const [year, month, day] = reopenYmd.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getMessageFromEnv(locale: string): string | null {
  const envKey =
    locale === "fr"
      ? "VACATION_MESSAGE_FR"
      : locale === "en"
        ? "VACATION_MESSAGE_EN"
        : locale === "de"
          ? "VACATION_MESSAGE_DE"
          : null;

  if (!envKey) {
    return null;
  }

  const message = process.env[envKey]?.trim();
  return message || null;
}

export function getVacationDisplay(
  locale: string,
  labels: VacationLabels,
): VacationDisplay | null {
  if (process.env.VACATION_MODE !== "true") {
    return null;
  }

  const reopenYmd = parseReopenDate();
  if (!reopenYmd || !isVacationActive(reopenYmd)) {
    return null;
  }

  const formattedDate = formatReopenDate(reopenYmd, locale);
  const shortSubtitle = labels.formatReopening(formattedDate);
  const messageText = (
    getMessageFromEnv(locale) ?? labels.formatDefaultMessage(formattedDate)
  ).replace(/\\n/g, "\n");

  return {
    shortTitle: labels.shortTitle,
    shortSubtitle,
    pageTitle: labels.pageTitle,
    messageLines: messageText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  };
}
