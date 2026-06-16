import { unstable_cache } from "next/cache";

const EATBU_URL = "https://felicita-furdenheim.eatbu.com/?lang=fr";
const PARIS_TZ = "Europe/Paris";

export type TimeSlot = {
  opens: string;
  closes: string;
};

/** 0 = Sunday … 6 = Saturday (JavaScript convention). */
export type WeeklySchedule = Record<number, TimeSlot[]>;

export type OpeningStatus = {
  isOpen: boolean;
  titleKey: "open" | "closed" | "closedToday";
  subtitle: string;
};

const FALLBACK_SCHEDULE: WeeklySchedule = {
  0: [],
  1: [],
  2: [
    { opens: "11:30", closes: "13:30" },
    { opens: "18:30", closes: "21:30" },
  ],
  3: [
    { opens: "11:30", closes: "13:30" },
    { opens: "18:30", closes: "21:30" },
  ],
  4: [
    { opens: "11:30", closes: "13:30" },
    { opens: "18:30", closes: "21:30" },
  ],
  5: [
    { opens: "11:45", closes: "13:45" },
    { opens: "18:45", closes: "21:45" },
  ],
  6: [{ opens: "18:45", closes: "21:45" }],
};

function normalizeSchedule(schedule: WeeklySchedule): WeeklySchedule {
  return {
    ...schedule,
    0: [],
    6: [{ opens: "18:45", closes: "21:45" }],
  };
}

function parseDayOfWeek(value: string): number | null {
  const day = value.split("/").pop() ?? value;

  const map: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return map[day] ?? null;
}

function isClosedSlot(slot: TimeSlot): boolean {
  return slot.opens === "00:00" && slot.closes === "00:00";
}

function parseScheduleFromHtml(html: string): WeeklySchedule | null {
  const matches = html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  );

  for (const match of matches) {
    try {
      const data = JSON.parse(match[1]) as {
        "@type"?: string;
        openingHoursSpecification?: Array<{
          dayOfWeek?: string;
          opens?: string;
          closes?: string;
        }>;
      };

      if (data["@type"] !== "FoodEstablishment" || !data.openingHoursSpecification?.length) {
        continue;
      }

      const schedule: WeeklySchedule = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };

      for (const spec of data.openingHoursSpecification) {
        const day = spec.dayOfWeek ? parseDayOfWeek(spec.dayOfWeek) : null;
        const opens = spec.opens;
        const closes = spec.closes;

        if (day === null || !opens || !closes || isClosedSlot({ opens, closes })) {
          continue;
        }

        schedule[day].push({ opens, closes });
      }

      for (const day of Object.keys(schedule)) {
        schedule[Number(day)].sort((a, b) => a.opens.localeCompare(b.opens));
      }

      return schedule;
    } catch {
      continue;
    }
  }

  return null;
}

async function fetchWeeklySchedule(): Promise<WeeklySchedule> {
  try {
    const response = await fetch(EATBU_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return normalizeSchedule(FALLBACK_SCHEDULE);
    }

    const html = await response.text();
    const parsed = parseScheduleFromHtml(html) ?? FALLBACK_SCHEDULE;
    return normalizeSchedule(parsed);
  } catch {
    return normalizeSchedule(FALLBACK_SCHEDULE);
  }
}

export const getWeeklySchedule = unstable_cache(
  fetchWeeklySchedule,
  ["eatbu-opening-hours-v2"],
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

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: weekdayMap[weekday] ?? 0,
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
  const date = new Date(Date.UTC(2020, 0, 1, hours, minutes));

  if (locale === "fr" || locale === "de") {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    return `${hh}h${mm}`;
  }

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
