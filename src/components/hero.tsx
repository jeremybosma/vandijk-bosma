"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { useBooking } from "@/components/booking-provider";
import { SITE } from "@/lib/site";

const collage = [
  {
    src: "/collage-1.jpg",
    alt: "Auto met glanzende lak tijdens detailing",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/collage-2.jpg",
    alt: "Professionele handwas van een sportwagen",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/collage-3.jpg",
    alt: "Close-up van detailing met spons en schuim",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/collage-4.jpg",
    alt: "Auto wordt gewassen met schuim",
    className: "col-span-2 row-span-1 sm:col-span-1",
  },
] as const;

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1 sm:grid-cols-3 sm:grid-rows-2 sm:gap-1.5">
        {collage.map((item, index) => (
          <motion.div
            key={item.src}
            className={`relative overflow-hidden ${item.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: index * 0.12,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={index === 0}
              className="object-cover object-center scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, oklch(0.12 0.02 70 / 0.35) 0%, oklch(0.12 0.02 70 / 0.2) 28%, oklch(0.13 0.015 70 / 0.72) 62%, oklch(0.14 0.012 70 / 0.96) 100%),
            radial-gradient(ellipse 70% 55% at 50% 100%, oklch(0.14 0.02 70 / 0.9), transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
        </motion.div>

        <motion.h1
          className="mt-5 max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight text-white/95 sm:text-3xl md:text-[2.15rem]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          Professionele detailing bij u thuis
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          Wij komen naar u toe in Noord-Nederland, voor een frisse, verzorgde
          auto zonder garagebezoek.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <button
            type="button"
            onClick={() => openBooking()}
            className="pressable inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink"
          >
            Afspraak maken
          </button>
          <a
            href="#diensten"
            className="pressable inline-flex h-12 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/16"
          >
            Bekijk diensten
          </a>
        </motion.div>
      </div>
    </section>
  );
}
