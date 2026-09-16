"use client";

import { usePathname } from "@/i18n/navigation";

export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/menu") return null;
  return children;
}
