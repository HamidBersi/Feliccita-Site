import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ReservationButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function ReservationButton({ children, className }: ReservationButtonProps) {
  return (
    <Link href="/reserver" className={className}>
      {children}
    </Link>
  );
}
