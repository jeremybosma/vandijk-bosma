"use client";

import { useEffect, useState } from "react";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const booking = document.getElementById("afspraak");
      if (!booking) {
        setVisible(window.scrollY > 320);
        return;
      }
      const rect = booking.getBoundingClientRect();
      const inBooking =
        rect.top < window.innerHeight * 0.7 && rect.bottom > 80;
      setVisible(window.scrollY > 320 && !inBooking);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#afspraak"
      className={`pressable fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-[0_12px_40px_oklch(0.45_0.08_85/0.45)] transition-[opacity,transform] duration-300 sm:bottom-7 sm:right-7 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-ink/35" />
        <span className="relative inline-flex size-2 rounded-full bg-accent-ink/70" />
      </span>
      Afspraak plannen
    </a>
  );
}
