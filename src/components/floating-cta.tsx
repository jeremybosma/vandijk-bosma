"use client";

import { useEffect, useState } from "react";

import { useBooking } from "@/components/booking-provider";
import { Icons } from "@/components/icons";

export function FloatingCta() {
  const { open, openBooking } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320 && !open);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <button
      type="button"
      onClick={() => openBooking()}
      className={`pressable fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-[0_12px_40px_oklch(0.45_0.08_85/0.45)] transition-[opacity,transform] duration-300 sm:bottom-7 sm:right-7 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <Icons.Calendar size={16} />
      Afspraak plannen
    </button>
  );
}
