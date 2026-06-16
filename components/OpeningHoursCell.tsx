"use client";

import { useEffect, useState } from "react";
import {
  getOpeningStatus,
  type OpeningStatus,
  type WeeklySchedule,
} from "@/lib/opening-hours";

type OpeningHoursCellProps = {
  schedule: WeeklySchedule;
  locale: string;
  labels: {
    open: string;
    closed: string;
    closedToday: string;
  };
};

export default function OpeningHoursCell({
  schedule,
  locale,
  labels,
}: OpeningHoursCellProps) {
  const [status, setStatus] = useState<OpeningStatus>(() =>
    getOpeningStatus(schedule, locale),
  );

  useEffect(() => {
    function refresh() {
      setStatus(getOpeningStatus(schedule, locale));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [schedule, locale]);

  const title =
    status.titleKey === "open"
      ? labels.open
      : status.titleKey === "closedToday"
        ? labels.closedToday
        : labels.closed;

  return (
    <>
      <p className="text-[11px] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-gold sm:text-[13px] sm:leading-snug">
        {title}
      </p>
      <div className="mt-px text-[9px] leading-tight text-muted transition-colors duration-300 group-hover:text-ink/70 sm:mt-0.5 sm:text-[11px] sm:leading-snug">
        {status.subtitle}
      </div>
    </>
  );
}
