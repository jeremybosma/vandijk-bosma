"use client";

import { TextMorph } from "torph/react";
import type { ElementType } from "react";

import { formatPrice } from "@/lib/catalog";

export function MorphText({
  children,
  as = "span",
  className,
  duration = 400,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
}) {
  return (
    <TextMorph
      as={as}
      className={className}
      duration={duration}
      ease="cubic-bezier(0.19, 1, 0.22, 1)"
      locale="nl"
    >
      {children}
    </TextMorph>
  );
}

export function MorphPrice({
  value,
  prefix = "",
  suffix = "",
  className,
  as = "span",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  as?: ElementType;
}) {
  return (
    <MorphText as={as} className={className}>
      {`${prefix}${formatPrice(value)}${suffix}`}
    </MorphText>
  );
}

export function MorphPriceFrom({
  value,
  className,
  as = "span",
}: {
  value: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <MorphPrice value={value} prefix="vanaf " className={className} as={as} />
  );
}
