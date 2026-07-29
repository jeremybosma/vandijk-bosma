"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";

import {
  BOOKABLE_SERVICES,
  formatPrice,
  formatPriceFrom,
  getService,
  type ServiceId,
} from "@/lib/services";

type Step = "service" | "day" | "slot" | "details" | "done";

type BuildingType =
  | "woning"
  | "priveterrein"
  | "appartement"
  | "bedrijfspand"
  | "anders";

type BookingState = {
  serviceId: ServiceId | null;
  dayKey: string | null;
  slot: string | null;
  name: string;
  phone: string;
  address: string;
  postcode: string;
  buildingType: BuildingType | "";
};

const STORAGE_KEY = "vdb-last-booking";

const SLOTS = ["09:00 - 12:00", "13:00 - 17:00", "18:00 - 21:00"] as const;

const BUILDING_TYPES: { value: BuildingType; label: string }[] = [
  { value: "woning", label: "Woning" },
  { value: "priveterrein", label: "Priveterrein" },
  { value: "appartement", label: "Appartement / flat" },
  { value: "bedrijfspand", label: "Bedrijfspand" },
  { value: "anders", label: "Anders" },
];

const emptyDetails = {
  name: "",
  phone: "",
  address: "",
  postcode: "",
  buildingType: "" as const,
};

function buildDays(count = 14) {
  const days: { key: string; label: string; sub: string; preferred: boolean }[] =
    [];
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const start = new Date();
  start.setHours(12, 0, 0, 0);

  for (let i = 1; i <= count; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const day = date.getDay();
    const preferred = day === 0 || day === 6 || day === 5;
    days.push({
      key: date.toISOString().slice(0, 10),
      label: formatter.format(date),
      sub: preferred ? "Avond / weekend" : "Op aanvraag",
      preferred,
    });
  }
  return days;
}

function mockSlotAvailable(dayKey: string, slot: string) {
  const seed = [...dayKey, ...slot].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return seed % 5 !== 0;
}

function isServiceId(value: string | null): value is ServiceId {
  return (
    value === "exterieur" ||
    value === "interieur" ||
    value === "full" ||
    value === "abonnement"
  );
}

function BookingFlow() {
  const searchParams = useSearchParams();
  const days = useMemo(() => buildDays(), []);
  const [step, setStep] = useState<Step>("service");
  const [state, setState] = useState<BookingState>({
    serviceId: null,
    dayKey: null,
    slot: null,
    ...emptyDetails,
  });

  useEffect(() => {
    const preferred = searchParams.get("dienst");
    if (isServiceId(preferred)) {
      setState((prev) => ({
        ...prev,
        serviceId: preferred,
        dayKey: null,
        slot: null,
      }));
      setStep("day");
    }
  }, [searchParams]);

  const service = state.serviceId ? getService(state.serviceId) : null;
  const selectedDay = days.find((day) => day.key === state.dayKey);

  function selectService(id: ServiceId) {
    setState((prev) => ({ ...prev, serviceId: id }));
    setStep("day");
  }

  function selectDay(key: string) {
    setState((prev) => ({ ...prev, dayKey: key, slot: null }));
    setStep("slot");
  }

  function selectSlot(slot: string) {
    setState((prev) => ({ ...prev, slot }));
    setStep("details");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!state.serviceId || !state.dayKey || !state.slot) return;

    const payload = {
      ...state,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore quota / private mode
    }
    setStep("done");
  }

  function reset() {
    setState({
      serviceId: null,
      dayKey: null,
      slot: null,
      ...emptyDetails,
    });
    setStep("service");
  }

  const steps: { id: Step; label: string }[] = [
    { id: "service", label: "Dienst" },
    { id: "day", label: "Dag" },
    { id: "slot", label: "Tijd" },
    { id: "details", label: "Gegevens" },
  ];

  const activeIndex = steps.findIndex((item) => item.id === step);

  return (
    <section id="afspraak" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Afspraak
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Plan uw detailing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Kies een pakket, dag en tijdvak. Wij bevestigen de afspraak
            telefonisch of per mail. Avonden en weekenden hebben de voorkeur.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_24px_80px_oklch(0_0_0/0.28)]">
          {step !== "done" ? (
            <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-4 sm:px-6">
              {steps.map((item, index) => {
                const done = activeIndex > index;
                const current = item.id === step;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!done && !current}
                    onClick={() => {
                      if (done) setStep(item.id);
                    }}
                    className={`pressable shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      current
                        ? "bg-accent text-accent-ink"
                        : done
                          ? "bg-surface-2 text-foreground"
                          : "bg-transparent text-muted"
                    }`}
                  >
                    {index + 1}. {item.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="p-5 sm:p-8">
            {step === "service" ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {BOOKABLE_SERVICES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectService(item.id)}
                    className={`pressable rounded-2xl border p-5 text-left transition-colors ${
                      item.id === "abonnement"
                        ? "border-accent/40 bg-accent/8 hover:border-accent/60"
                        : "border-border bg-surface-2 hover:border-accent/45"
                    }`}
                  >
                    <p className="font-display text-lg font-semibold">
                      {item.name}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {item.priceSuffix
                        ? `${formatPrice(item.price)}${item.priceSuffix}`
                        : formatPriceFrom(item.price)}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.durationLabel}</p>
                  </button>
                ))}
              </div>
            ) : null}

            {step === "day" ? (
              <div>
                <p className="mb-4 text-sm text-muted">
                  Gekozen:{" "}
                  <span className="text-foreground">{service?.name}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {days.map((day) => (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => selectDay(day.key)}
                      className={`pressable rounded-2xl border p-3.5 text-left transition-colors ${
                        day.preferred
                          ? "border-accent/35 bg-accent/8 hover:border-accent/60"
                          : "border-border bg-surface-2 hover:border-border"
                      }`}
                    >
                      <p className="text-sm font-medium capitalize">{day.label}</p>
                      <p className="mt-1 text-xs text-muted">{day.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === "slot" ? (
              <div>
                <p className="mb-4 text-sm text-muted">
                  {selectedDay?.label} · {service?.name}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {SLOTS.map((slot) => {
                    const available =
                      state.dayKey != null &&
                      mockSlotAvailable(state.dayKey, slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        onClick={() => selectSlot(slot)}
                        className={`pressable rounded-2xl border px-4 py-5 text-sm font-medium transition-colors ${
                          available
                            ? "border-border bg-surface-2 hover:border-accent/50"
                            : "cursor-not-allowed border-border/50 bg-background/40 text-muted opacity-50"
                        }`}
                      >
                        {slot}
                        <span className="mt-1 block text-xs font-normal text-muted">
                          {available ? "Beschikbaar" : "Vol"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {step === "details" ? (
              <form onSubmit={submit} className="mx-auto max-w-lg">
                <p className="mb-6 text-sm text-muted">
                  {service?.name} · {selectedDay?.label} · {state.slot}
                </p>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm text-muted">Naam</span>
                    <input
                      required
                      value={state.name}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-[border-color] focus:border-accent"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Telefoon</span>
                    <input
                      required
                      type="tel"
                      value={state.phone}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          phone: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-[border-color] focus:border-accent"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Adres</span>
                    <input
                      required
                      value={state.address}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          address: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-[border-color] focus:border-accent"
                      autoComplete="street-address"
                      placeholder="Straatnaam en huisnummer"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Postcode</span>
                    <input
                      required
                      value={state.postcode}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          postcode: event.target.value.toUpperCase(),
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-[border-color] focus:border-accent"
                      autoComplete="postal-code"
                      placeholder="9602 TS"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Type locatie</span>
                    <select
                      required
                      value={state.buildingType}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          buildingType: event.target.value as BuildingType | "",
                        }))
                      }
                      className="mt-1.5 h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 text-sm outline-none transition-[border-color] focus:border-accent"
                    >
                      <option value="" disabled>
                        Kies type locatie
                      </option>
                      {BUILDING_TYPES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button
                  type="submit"
                  className="pressable mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink"
                >
                  Afspraak aanvragen
                </button>
                <p className="mt-3 text-center text-xs text-muted">
                  Demo-flow: er wordt nog geen echte bevestiging verstuurd.
                </p>
              </form>
            ) : null}

            {step === "done" ? (
              <div className="mx-auto max-w-md py-6 text-center">
                <p className="font-display text-3xl font-semibold tracking-tight">
                  Aanvraag ontvangen
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Bedankt{state.name ? `, ${state.name}` : ""}. Wij nemen snel
                  contact met u op om {service?.name.toLowerCase()} op{" "}
                  {selectedDay?.label} ({state.slot}) te bevestigen.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="pressable mt-8 inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium"
                >
                  Nieuwe afspraak
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <Suspense
      fallback={
        <section id="afspraak" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="h-64 animate-pulse rounded-[1.75rem] border border-border bg-surface" />
          </div>
        </section>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
