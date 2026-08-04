"use client";

import { motion } from "motion/react";

import { useBooking } from "@/components/booking-provider";
import { Icons } from "@/components/icons";
import { MorphPrice } from "@/components/morph-text";

const points = [
  "1× per maand een full detail bij u thuis",
  "Maandelijks betalen, geen losse facturen per beurt",
  "Minimale looptijd van 6 maanden",
  "Vast moment inplannen dat bij u past",
] as const;

export function Abonnement() {
  const { openBooking } = useBooking();

  return (
    <section
      id="abonnement"
      className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <motion.div
        className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-accent/35 bg-surface"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              <Icons.Star className="text-accent" size={14} />
              <span>Abonnement</span>
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Full detail elke maand, voor particulieren
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Liever geen losse afspraken? Met het privé-abonnement komen wij
              maandelijks langs voor een full detail. U betaalt per maand en
              houdt uw auto structureel in topconditie.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Icons.Checkmark
                    className="mt-0.5 shrink-0 text-accent"
                    size={15}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between border-t border-border bg-surface-2/70 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <div>
              <p className="text-sm text-muted">Per maand</p>
              <p className="mt-2 flex items-baseline gap-2">
                <MorphPrice
                  value={80}
                  className="font-display text-5xl font-semibold tracking-tight"
                />
                <span className="text-sm text-muted">/ maand</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Full detail · 1× per maand · min. 6 maanden · incl. BTW
              </p>
              <p className="mt-4 text-sm text-accent">
                Bespaar t.o.v. een losse full detail van{" "}
                <MorphPrice value={150} className="inline" />
              </p>
            </div>

            <button
              type="button"
              onClick={() => openBooking({ dienst: "abonnement" })}
              className="pressable mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink"
            >
              Abonnement aanvragen
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
