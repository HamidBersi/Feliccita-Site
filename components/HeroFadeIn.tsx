"use client";

import type { ReactNode } from "react";

type HeroFadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function HeroFadeIn({
  children,
  delay = 0,
  className = "",
}: HeroFadeInProps) {
  return (
    <div
      className={`hero-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
