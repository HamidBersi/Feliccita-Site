import { unstable_cache } from "next/cache";

const PARIS_TZ = "Europe/Paris";

export type TimeSlot = {
  opens: string;
  closes: string;
};

/** 0 = Sunday … 6 = Saturday (JavaScript / Google Places convention). */
export type WeeklySchedule = Record<number, TimeSlot[]>;

export type OpeningStatus = {
  isOpen: boolean;
  titleKey: "open" | "closed" | "closedToday";
  subtitle: string;
};

/** Fallback aligné sur la fiche Google si l'API est indisponible. */
const FALLBACK_SCHEDULE: WeeklySchedule = {
  0: [{ opens: "18:45", closes: "21:30" }],
  1: [{ opens: "11:45", closes: "13:45" }],
  2: [
    { opens: "11:45", closes: "13:45" },
    { opens: "18:45", closes: "21:30" },
  ],
  3: [
    { opens: "11:45", closes: "13:45" },
    { opens: "18:45", closes: "21:30" },
  ],
  4: [
    { opens: "11:45", closes: "13:45" },
    { opens: "18:45", closes: "21:30" },
  ],
  5: [
    { opens: "11:45", closes: "13:45" },
    { opens: "18:45", closes: "21:45" },
  ],
  6: [{ opens: "18:45", closes: "21:45" }],
};

function emptySchedule(): WeeklySchedule {
  return { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

type GooglePeriod = {
  open?: { day?: number; hour?: number; minute?: number };
  close?: { day?: number; hour?: number; minute?: number };
};

export function scheduleFromGooglePeriods(periods: GooglePeriod[] | undefined): WeeklySchedule | null {
  if (!periods?.length) {
    return null;
  }

  const schedule = emptySchedule();

  for (const period of periods) {
    const open = period.open;
    const close = period.close;

    if (
      open?.day === undefined ||
      open.hour === undefined ||
      open.minute === undefined ||
      close?.hour === undefined ||
      close.minute === undefined
    ) {
      continue;
    }

    // Close day usually matches open day for restaurant meal slots.
    const day = open.day;
    if (day < 0 || day > 6) {
      continue;
    }

    schedule[day].push({
      opens: `${pad2(open.hour)}:${pad2(open.minute)}`,
      closes: `${pad2(close.hour)}:${pad2(close.minute)}`,
    });
  }

  for (const day of Object.keys(schedule)) {
    schedule[Number(day)].sort((a, b) => a.opens.localeCompare(b.opens));
  }

  const hasAnySlot = Object.values(schedule).some((slots) => slots.length > 0);
  return hasAnySlot ? schedule : null;
}

async function fetchWeeklyScheduleFromGoogle(): Promise<WeeklySchedule> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return FALLBACK_SCHEDULE;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "regularOpeningHours",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(
        "Google Places hours API error:",
        response.status,
        errorBody.slice(0, 400),
      );
      return FALLBACK_SCHEDULE;
    }

    const data = (await response.json()) as {
      regularOpeningHours?: { periods?: GooglePeriod[] };
    };

    return (
      scheduleFromGooglePeriods(data.regularOpeningHours?.periods) ?? FALLBACK_SCHEDULE
    );
  } catch (error) {
    console.error("Google Places hours fetch failed:", error);
    return FALLBACK_SCHEDULE;
  }
}

export const getWeeklySchedule = unstable_cache(
  fetchWeeklyScheduleFromGoogle,
  ["google-opening-hours-v1"],
  { revalidate: 3600 },
);

function getParisDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: PARIS_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";

  const weekdayMap: Record<string, string> = {
    Sun: "0",
    Mon: "1",
    Tue: "2",
    Wed: "3",
    Thu: "4",
    Fri: "5",
    Sat: "6",
  };

  return {
    day: Number(weekdayMap[weekday] ?? 0),
    minutes: Number(hour) * 60 + Number(minute),
  };
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isOpenAt(schedule: WeeklySchedule, date = new Date()): boolean {
  const { day, minutes } = getParisDateParts(date);
  const slots = schedule[day] ?? [];

  return slots.some(
    (slot) => minutes >= toMinutes(slot.opens) && minutes < toMinutes(slot.closes),
  );
}

function formatTime(time: string, locale: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (locale === "fr" || locale === "de") {
    return `${pad2(hours)}h${pad2(minutes)}`;
  }

  const date = new Date(Date.UTC(2020, 0, 1, hours, minutes));
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}

export function getParisWeekday(date = new Date()): number {
  return getParisDateParts(date).day;
}

export function formatDaySchedule(slots: TimeSlot[], locale: string): string {
  if (!slots.length) {
    return "";
  }

  return slots
    .map((slot) => `${formatTime(slot.opens, locale)} – ${formatTime(slot.closes, locale)}`)
    .join(" / ");
}

export function getOpeningStatus(
  schedule: WeeklySchedule,
  locale: string,
  date = new Date(),
): OpeningStatus {
  const { day } = getParisDateParts(date);
  const todaySlots = schedule[day] ?? [];
  const isOpen = isOpenAt(schedule, date);

  if (isOpen) {
    return {
      isOpen: true,
      titleKey: "open",
      subtitle: formatDaySchedule(todaySlots, locale),
    };
  }

  if (!todaySlots.length) {
    const next = getNextOpenDaySchedule(schedule, day);
    return {
      isOpen: false,
      titleKey: "closedToday",
      subtitle: next ? formatDaySchedule(next.slots, locale) : "",
    };
  }

  return {
    isOpen: false,
    titleKey: "closed",
    subtitle: formatDaySchedule(todaySlots, locale),
  };
}

function getNextOpenDaySchedule(
  schedule: WeeklySchedule,
  fromDay: number,
): { day: number; slots: TimeSlot[] } | null {
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = (fromDay + offset) % 7;
    const slots = schedule[day] ?? [];

    if (slots.length) {
      return { day, slots };
    }
  }

  return null;
}
