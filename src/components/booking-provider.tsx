"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { BookableId } from "@/lib/catalog";

type OpenOptions = {
  dienst?: BookableId;
};

type BookingContextValue = {
  open: boolean;
  initialDienst: BookableId | null;
  openBooking: (options?: OpenOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialDienst, setInitialDienst] = useState<BookableId | null>(null);

  const openBooking = useCallback((options?: OpenOptions) => {
    setInitialDienst(options?.dienst ?? null);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      initialDienst,
      openBooking,
      closeBooking,
    }),
    [open, initialDienst, openBooking, closeBooking],
  );

  return <BookingContext value={value}>{children}</BookingContext>;
}

export function useBooking() {
  const value = use(BookingContext);
  if (!value) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return value;
}
