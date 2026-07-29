import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Voorwaarden",
  description: `Algemene voorwaarden van ${SITE.fullName}.`,
};

export default function VoorwaardenPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-28 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Juridisch
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
        Voorwaarden
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Afspraken via deze website zijn aanvragen. {SITE.fullName} bevestigt
          de definitieve planning persoonlijk. Prijzen zijn inclusief BTW tenzij
          anders vermeld.
        </p>
        <p>
          Annuleren of verzetten kan kosteloos tot 24 uur van tevoren. Bij
          no-show behouden wij ons het recht voor om een vergoeding in rekening
          te brengen.
        </p>
        <p>
          Werkzaamheden vinden plaats op locatie. Zorg voor voldoende ruimte,
          watertoegang indien nodig, en een veilige werkplek.
        </p>
        <p>
          Vragen over deze voorwaarden? Neem contact op via{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-foreground underline decoration-border underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
      <Link
        href="/"
        className="pressable mt-10 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm"
      >
        Terug naar home
      </Link>
    </article>
  );
}
