"use client";

import { motion } from "motion/react";

import { useBooking } from "@/components/booking-provider";
import { MorphPriceFrom } from "@/components/morph-text";
import { SERVICES, type PackageId } from "@/lib/catalog";

export function Diensten() {
  const { openBooking } = useBooking();

  return (
    <section id="diensten" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Diensten
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Drie pakketten. Duidelijke prijzen.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Alle behandelingen vinden plaats bij u thuis of op een andere
            afgesproken locatie. Prijzen inclusief BTW.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              className={`flex flex-col rounded-[1.5rem] border border-border bg-surface p-6 sm:p-7 ${
                service.id === "full" ? "md:-translate-y-2 md:border-accent/40" : ""
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {service.id === "full" ? (
                <span className="mb-4 w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  Meest gekozen
                </span>
              ) : (
                <span className="mb-4 h-6" aria-hidden />
              )}
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {service.name}
              </h3>
              <p className="mt-3 flex items-baseline gap-2">
                <MorphPriceFrom
                  value={service.price}
                  className="text-3xl font-semibold tracking-tight"
                />
                <span className="text-sm text-muted">{service.durationLabel}</span>
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {(service.highlights ?? []).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  openBooking({ dienst: service.id as PackageId })
                }
                className="pressable mt-7 inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
              >
                Kies dit pakket
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
