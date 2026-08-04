"use client";

import Image from "next/image";

import { useBooking } from "@/components/booking-provider";
import { MorphPrice } from "@/components/morph-text";
import type { BookableId } from "@/lib/catalog";

const highlights = [
  "Avonden en weekenden",
  "Bij u thuis of op locatie",
  "Binnen 2 minuten aangevraagd",
] as const;

const quickOptions: {
  id: BookableId;
  label: string;
  price: number;
}[] = [
  { id: "exterieur", label: "Exterieur", price: 70 },
  { id: "interieur", label: "Interieur", price: 100 },
  { id: "full", label: "Full detail", price: 150 },
  { id: "koplampen", label: "Koplampen", price: 80 },
];

export function Booking() {
  const { openBooking } = useBooking();

  return (
    <section id="afspraak" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[240px] lg:min-h-full">
              <Image
                src="/collage-2.jpg"
                alt="Professionele detailing op locatie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/20 lg:to-background/85" />
              <p className="absolute bottom-5 left-5 right-5 text-sm text-white/90 lg:hidden">
                Wij komen naar u toe. U hoeft nergens heen.
              </p>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Afspraak
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Plan uw detailing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Kies een pakket of een losse behandeling, voeg eventueel extras
                toe en plan een moment dat past. Wij bevestigen telefonisch of
                per mail.
              </p>

              <ul className="mt-6 space-y-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Snel starten
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => openBooking({ dienst: option.id })}
                      className="pressable rounded-full border border-border bg-surface-2 px-3.5 py-2 text-sm transition-colors hover:border-accent/45"
                    >
                      <span className="font-medium">{option.label}</span>
                      <MorphPrice
                        value={option.price}
                        className="ml-1.5 text-muted"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openBooking()}
                className="pressable mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink sm:w-auto"
              >
                Afspraak maken
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
