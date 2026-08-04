"use client";

import { useBooking } from "@/components/booking-provider";

export function Booking() {
  const { openBooking } = useBooking();

  return (
    <section id="afspraak" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Afspraak
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Plan uw detailing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Kies een pakket of losse optie, voeg extras toe en kies een
                moment. Avonden en weekenden hebben de voorkeur.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="pressable inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-ink"
            >
              Afspraak maken
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
