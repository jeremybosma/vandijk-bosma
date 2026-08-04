import type { ReactNode } from "react";

import { Icons } from "@/components/icons";

type IconName = keyof typeof Icons;

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  icon: IconName;
}) {
  const Icon = Icons[icon];

  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <Icon className="text-accent" size={14} />
        <span>{eyebrow}</span>
      </p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
