"use client";

import { useEffect, useState } from "react";
import {
  formatDaySchedule,
  getOpeningStatus,
  getParisWeekday,
  type WeeklySchedule,
} from "@/lib/opening-hours";

const WEEK_DAYS = [1, 2, 3, 4, 5, 6, 0] as const;

type HoursScheduleProps = {
  schedule: WeeklySchedule;
  locale: string;
  dayLabels: Record<(typeof WEEK_DAYS)[number], string>;
  closedLabel: string;
  statusLabels: {
    open: string;
    closed: string;
    closedToday: string;
  };
};

export default function HoursSchedule({
  schedule,
  locale,
  dayLabels,
  closedLabel,
  statusLabels,
}: HoursScheduleProps) {
  const [today, setToday] = useState(() => getParisWeekday());
  const [status, setStatus] = useState(() => getOpeningStatus(schedule, locale));

  useEffect(() => {
    function refresh() {
      setToday(getParisWeekday());
      setStatus(getOpeningStatus(schedule, locale));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [schedule, locale]);

  const statusTitle =
    status.titleKey === "open"
      ? statusLabels.open
      : status.titleKey === "closedToday"
        ? statusLabels.closedToday
        : statusLabels.closed;

  return (
    <div className="space-y-8">
      <div
        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:px-6 sm:py-5 ${
          status.isOpen
            ? "border-emerald-200/80 bg-emerald-50/90"
            : "border-black/8 bg-white/90"
        }`}
      >
        <span
          className={`relative flex h-3 w-3 shrink-0 rounded-full ${
            status.isOpen ? "bg-emerald-500" : "bg-muted/50"
          }`}
          aria-hidden="true"
        >
          {status.isOpen ? (
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
          ) : null}
        </span>
        <div className="min-w-0">
          <p
            className={`font-serif text-xl sm:text-2xl ${
              status.isOpen ? "text-emerald-900" : "text-ink"
            }`}
          >
            {statusTitle}
          </p>
          {status.subtitle ? (
            <p className="mt-1 text-sm text-muted sm:text-base">{status.subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        {WEEK_DAYS.map((day, index) => {
          const slots = schedule[day] ?? [];
          const hours = slots.length
            ? formatDaySchedule(slots, locale)
            : closedLabel;
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-4.5 ${
                index > 0 ? "border-t border-black/6" : ""
              } ${isToday ? "bg-gold-bg/50" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                {isToday ? (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="h-2 w-2 shrink-0" aria-hidden="true" />
                )}
                <span
                  className={`text-sm sm:text-base ${
                    isToday ? "font-semibold text-ink" : "font-medium text-ink/80"
                  }`}
                >
                  {dayLabels[day]}
                </span>
              </div>
              <span
                className={`shrink-0 text-right text-xs sm:text-sm ${
                  slots.length ? "text-muted" : "text-muted/60"
                }`}
              >
                {hours}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
