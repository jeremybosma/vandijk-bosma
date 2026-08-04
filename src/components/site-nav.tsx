"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useBooking } from "@/components/booking-provider";
import { Icons } from "@/components/icons";
import { SITE } from "@/lib/site";

const links = [
  { href: "#diensten", label: "Diensten" },
  { href: "#abonnement", label: "Abonnement" },
  { href: "#zakelijk", label: "Zakelijk" },
  { href: "#werkgebied", label: "Werkgebied" },
  { href: "#afspraak", label: "Afspraak" },
] as const;

export function SiteNav() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground pressable"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                scrolled || open
                  ? "text-muted hover:text-foreground"
                  : "text-white hover:text-white/65"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openBooking()}
            className="pressable inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-ink"
          >
            <Icons.Calendar size={15} />
            Afspraak maken
          </button>
        </nav>

        <button
          type="button"
          className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Icons.Close size={16} /> : <Icons.Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-base text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="pressable mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-ink"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
            >
              <Icons.Calendar size={16} />
              Afspraak maken
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
