import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacyverklaring van ${SITE.fullName}.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-28 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Juridisch
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
        Privacy
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          {SITE.fullName} verwerkt persoonsgegevens alleen om afspraken te
          plannen en contact met u op te nemen. Wij delen uw gegevens niet met
          derden voor marketingdoeleinden.
        </p>
        <p>
          Gegevens die u via het afspraakformulier invult (naam, telefoon,
          adres, postcode, type locatie) worden lokaal in uw browser opgeslagen
          voor deze demo en kunnen per e-mail of telefoon met ons worden
          gedeeld wanneer u contact opneemt.
        </p>
        <p>
          Vragen? Mail{" "}
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
