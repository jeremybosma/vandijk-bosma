"use client";

import type { ReactNode } from "react";

import { BookingDeepLink, BookingDialog } from "@/components/booking-dialog";
import { BookingProvider } from "@/components/booking-provider";

export function BookingShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      {children}
      <BookingDialog />
      <BookingDeepLink />
    </BookingProvider>
  );
}
