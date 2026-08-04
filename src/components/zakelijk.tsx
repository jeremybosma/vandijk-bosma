"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Icons } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

const offerings = [
  {
    title: "Showrooms & dealers",
    body: "Demo-auto’s en afleverklare voertuigen die er altijd piekfijn uitzien, op locatie, zonder downtime voor uw showroomvloer.",
    icon: "Car" as const,
  },
  {
    title: "Lease & vloot",
    body: "Periodieke detailing voor leasewagens en kleine wagenparken. Vast schema, vaste kwaliteit, één aanspreekpunt.",
    icon: "Shield" as const,
  },
  {
    title: "Partnerschappen",
    body: "Wij werken graag samen met showrooms, garagebedrijven en automotive merken die hun klanten een premium afwerking willen bieden.",
    icon: "Briefcase" as const,
  },
] as const;

export function Zakelijk() {
  const mailSubject = encodeURIComponent("Zakelijke samenwerking Van Dijk-Bosma");
  const mailBody = encodeURIComponent(
    "Hallo,\n\nIk wil graag meer weten over een zakelijke samenwerking / showroom partnership.\n\nBedrijfsnaam:\nLocatie:\nType samenwerking:\n\nMet vriendelijke groet,\n",
  );

  return (
    <section
      id="zakelijk"
      className="scroll-mt-24 border-y border-border bg-surface/50 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            icon="Briefcase"
            eyebrow="Zakelijk"
            title="Partnerschappen voor showrooms en fleets"
            description="Naast particulieren werken wij samen met bedrijven die hun voertuigen, of die van hun klanten, professioneel willen laten verzorgen. Flexibel op locatie, met een vaste werkwijze."
          />

          <ul className="mt-10 space-y-6">
            {offerings.map((item, index) => {
              const Icon = Icons[item.icon];
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                    <Icon className="text-accent" size={18} />
                    <span>{item.title}</span>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}?subject=${mailSubject}&body=${mailBody}`}
              className="pressable inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink"
            >
              Partneraanvraag sturen
            </a>
            <a
              href={`tel:${SITE.phoneSven}`}
              className="pressable inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium"
            >
              Bel Sven
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/showroom.jpg"
            alt="Moderne autodealer showroom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 text-sm text-white/90">
            Op locatie bij showroom, dealer of kantoor, zonder dat voertuigen
            de deur uit hoeven.
          </p>
        </div>
      </div>
    </section>
  );
}
