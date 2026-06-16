"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
