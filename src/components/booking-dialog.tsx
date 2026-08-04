"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { useBooking } from "@/components/booking-provider";
import {
  ADDONS,
  PACKAGES,
  addonPriceFor,
  addonSavings,
  calculateTotal,
  formatPrice,
  fullUpsellSavings,
  getCatalogItem,
  isBookableId,
  isPackageId,
  usesPackageAddonPricing,
  type AddonId,
  type BookableId,
  type CatalogItem,
} from "@/lib/catalog";

type Step =
  | "service"
  | "upsell"
  | "addons"
  | "day"
  | "slot"
  | "details"
  | "done";

type BuildingType =
  | "woning"
  | "priveterrein"
  | "appartement"
  | "bedrijfspand"
  | "anders";

type FormState = {
  primaryId: BookableId | null;
  addonIds: AddonId[];
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

const emptyForm: FormState = {
  primaryId: null,
  addonIds: [],
  dayKey: null,
  slot: null,
  name: "",
  phone: "",
  address: "",
  postcode: "",
  buildingType: "",
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

function afterServiceStep(primaryId: BookableId): Step {
  if (primaryId === "exterieur" || primaryId === "interieur") return "upsell";
  return "addons";
}

export function BookingDialog() {
  const { open, closeBooking, initialDienst } = useBooking();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const days = useMemo(() => buildDays(), []);
  const [step, setStep] = useState<Step>("service");
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!open) return;
    setForm({
      ...emptyForm,
      primaryId: initialDienst,
    });
    setStep(initialDienst ? afterServiceStep(initialDienst) : "service");
  }, [open, initialDienst]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeBooking]);

  const primary = form.primaryId ? getCatalogItem(form.primaryId) : null;
  const selectedDay = days.find((day) => day.key === form.dayKey);
  const total = calculateTotal(form.primaryId, form.addonIds);
  const packagePricing = usesPackageAddonPricing(form.primaryId);
  const upsellSave = fullUpsellSavings();

  const stepLabels: { id: Step; label: string }[] = [
    { id: "service", label: "Dienst" },
    ...(form.primaryId === "exterieur" || form.primaryId === "interieur"
      ? [{ id: "upsell" as const, label: "Upgrade" }]
      : []),
    { id: "addons", label: "Extra’s" },
    { id: "day", label: "Dag" },
    { id: "slot", label: "Tijd" },
    { id: "details", label: "Gegevens" },
  ];
  const activeIndex = stepLabels.findIndex((item) => item.id === step);

  function selectPrimary(id: BookableId) {
    setForm((prev) => ({
      ...prev,
      primaryId: id,
      addonIds: prev.addonIds.filter((addonId) => addonId !== id),
      dayKey: null,
      slot: null,
    }));
    setStep(afterServiceStep(id));
  }

  function acceptUpsell() {
    setForm((prev) => ({ ...prev, primaryId: "full" }));
    setStep("addons");
  }

  function skipUpsell() {
    setStep("addons");
  }

  function toggleAddon(id: AddonId) {
    setForm((prev) => {
      const exists = prev.addonIds.includes(id);
      return {
        ...prev,
        addonIds: exists
          ? prev.addonIds.filter((item) => item !== id)
          : [...prev.addonIds, id],
      };
    });
  }

  function continueFromAddons() {
    setStep("day");
  }

  function selectDay(key: string) {
    setForm((prev) => ({ ...prev, dayKey: key, slot: null }));
    setStep("slot");
  }

  function selectSlot(slot: string) {
    setForm((prev) => ({ ...prev, slot }));
    setStep("details");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.primaryId || !form.dayKey || !form.slot) return;

    const payload = {
      ...form,
      total,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore private mode
    }
    setStep("done");
  }

  function reset() {
    setForm(emptyForm);
    setStep("service");
  }

  const availableAddons = ADDONS.filter((addon) => addon.id !== form.primaryId);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/75 backdrop-blur-sm"
            aria-label="Sluiten"
            onClick={closeBooking}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92svh] w-full max-w-xl flex-col overflow-hidden rounded-t-[1.5rem] border border-border bg-surface shadow-[0_24px_80px_oklch(0_0_0/0.45)] sm:rounded-[1.5rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <div>
                <p
                  id={titleId}
                  className="font-display text-lg font-semibold tracking-tight"
                >
                  Afspraak plannen
                </p>
                {primary && step !== "service" ? (
                  <p className="text-xs text-muted">{primary.name}</p>
                ) : null}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeBooking}
                className="pressable inline-flex size-10 items-center justify-center rounded-full border border-border text-lg leading-none"
                aria-label="Dialog sluiten"
              >
                ×
              </button>
            </div>

            {step !== "done" ? (
              <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-3 sm:px-5">
                {stepLabels.map((item, index) => {
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
                      className={`pressable shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        current
                          ? "bg-accent text-accent-ink"
                          : done
                            ? "bg-surface-2 text-foreground"
                            : "text-muted"
                      }`}
                    >
                      {index + 1}. {item.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
              {step === "service" ? (
                <div className="space-y-6">
                  <ServiceGroup
                    title="Pakketten"
                    hint="Complete behandelingen voor binnen, buiten of beide."
                    items={PACKAGES}
                    onSelect={selectPrimary}
                  />
                  <ServiceGroup
                    title="Losse behandelingen"
                    hint="Alleen wat u nodig heeft, zonder volledig pakket."
                    items={ADDONS}
                    onSelect={selectPrimary}
                    accent
                  />
                </div>
              ) : null}

              {step === "upsell" ? (
                <UpsellStep
                  primaryId={form.primaryId}
                  primaryName={primary?.name ?? ""}
                  savings={upsellSave}
                  onAccept={acceptUpsell}
                  onSkip={skipUpsell}
                />
              ) : null}

              {step === "addons" ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted">
                    {packagePricing
                      ? "Voeg extra’s toe tegen pakketprijs."
                      : "Voeg extra’s toe of ga door zonder."}
                  </p>
                  {availableAddons.map((addon) => {
                    const selected = form.addonIds.includes(addon.id);
                    const price = addonPriceFor(addon, form.primaryId);
                    const save = addonSavings(addon);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`pressable flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors ${
                          selected
                            ? "border-accent/50 bg-accent/10"
                            : "border-border bg-surface-2 hover:border-accent/35"
                        }`}
                      >
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl outline outline-1 outline-black/10">
                          <Image
                            src={addon.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="font-medium leading-snug">
                              {addon.name}
                            </span>
                            <span className="shrink-0 text-right">
                              {packagePricing && save > 0 ? (
                                <>
                                  <span className="mr-1.5 text-xs text-muted line-through">
                                    {formatPrice(addon.soloPrice ?? addon.price)}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    {formatPrice(price)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm font-semibold">
                                  {formatPrice(price)}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {addon.description}
                          </span>
                          {packagePricing && save > 0 ? (
                            <span className="mt-1 inline-block text-[11px] font-medium text-accent">
                              Bespaar {formatPrice(save)} bij uw pakket
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                            selected
                              ? "border-accent bg-accent text-accent-ink"
                              : "border-border"
                          }`}
                          aria-hidden
                        >
                          {selected ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={continueFromAddons}
                    className="pressable mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink"
                  >
                    Verder naar datum
                  </button>
                </div>
              ) : null}

              {step === "day" ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {days.map((day) => (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => selectDay(day.key)}
                      className={`pressable rounded-2xl border p-3 text-left ${
                        day.preferred
                          ? "border-accent/35 bg-accent/8"
                          : "border-border bg-surface-2"
                      }`}
                    >
                      <p className="text-sm font-medium capitalize">{day.label}</p>
                      <p className="mt-1 text-xs text-muted">{day.sub}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === "slot" ? (
                <div className="grid gap-3">
                  {SLOTS.map((slot) => {
                    const available =
                      form.dayKey != null &&
                      mockSlotAvailable(form.dayKey, slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        onClick={() => selectSlot(slot)}
                        className={`pressable rounded-2xl border px-4 py-4 text-sm font-medium ${
                          available
                            ? "border-border bg-surface-2 hover:border-accent/50"
                            : "cursor-not-allowed border-border/50 opacity-45"
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
              ) : null}

              {step === "details" ? (
                <form onSubmit={submit} className="space-y-4">
                  <p className="text-sm text-muted">
                    {primary?.name} · {selectedDay?.label} · {form.slot}
                  </p>
                  <label className="block">
                    <span className="text-sm text-muted">Naam</span>
                    <input
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-accent"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Telefoon</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          phone: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-accent"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Adres</span>
                    <input
                      required
                      value={form.address}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          address: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-accent"
                      autoComplete="street-address"
                      placeholder="Straatnaam en huisnummer"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Postcode</span>
                    <input
                      required
                      value={form.postcode}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          postcode: event.target.value.toUpperCase(),
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-accent"
                      autoComplete="postal-code"
                      placeholder="9602 TS"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Type locatie</span>
                    <select
                      required
                      value={form.buildingType}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          buildingType: event.target
                            .value as BuildingType | "",
                        }))
                      }
                      className="mt-1.5 h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-accent"
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
                  <button
                    type="submit"
                    className="pressable inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink"
                  >
                    Afspraak aanvragen
                  </button>
                  <p className="text-center text-xs text-muted">
                    Demo-flow. Er wordt nog geen echte bevestiging verstuurd.
                  </p>
                </form>
              ) : null}

              {step === "done" ? (
                <div className="py-4 text-center">
                  <p className="font-display text-3xl font-semibold tracking-tight">
                    Aanvraag ontvangen
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Bedankt{form.name ? `, ${form.name}` : ""}. Wij nemen snel
                    contact op over {primary?.name.toLowerCase()} op{" "}
                    {selectedDay?.label} ({form.slot}).
                  </p>
                  {form.addonIds.length > 0 ? (
                    <p className="mt-2 text-sm text-muted">
                      Extra’s:{" "}
                      {form.addonIds
                        .map((id) => getCatalogItem(id)?.name)
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-3 text-base font-semibold">
                    Totaal {formatPrice(total)}
                    {form.primaryId && isPackageId(form.primaryId) &&
                    getCatalogItem(form.primaryId)?.priceSuffix
                      ? getCatalogItem(form.primaryId)?.priceSuffix
                      : ""}
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

            {step !== "service" && step !== "done" && step !== "details" ? (
              <div className="border-t border-border px-4 py-3 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">Totaal</p>
                    <p className="text-lg font-semibold tracking-tight">
                      {formatPrice(total)}
                      {primary?.priceSuffix && form.addonIds.length === 0
                        ? primary.priceSuffix
                        : ""}
                    </p>
                  </div>
                  {form.addonIds.length > 0 && packagePricing ? (
                    <p className="text-right text-xs text-accent">
                      Inclusief pakketkorting op extra’s
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ServiceGroup({
  title,
  hint,
  items,
  onSelect,
  accent = false,
}: {
  title: string;
  hint: string;
  items: CatalogItem[];
  onSelect: (id: BookableId) => void;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {title}
        </p>
        <p className="mt-1 text-sm text-muted">{hint}</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`pressable flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors ${
              accent
                ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                : "border-border bg-surface-2 hover:border-accent/40"
            }`}
          >
            <span className="relative size-16 shrink-0 overflow-hidden rounded-xl outline outline-1 outline-black/10">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-start justify-between gap-2">
                <span className="font-medium leading-snug">{item.name}</span>
                <span className="shrink-0 text-sm font-semibold">
                  {item.priceSuffix
                    ? `${formatPrice(item.price)}${item.priceSuffix}`
                    : formatPrice(item.price)}
                </span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {item.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function UpsellStep({
  primaryId,
  primaryName,
  savings,
  onAccept,
  onSkip,
}: {
  primaryId: BookableId | null;
  primaryName: string;
  savings: number;
  onAccept: () => void;
  onSkip: () => void;
}) {
  const isExterior = primaryId === "exterieur";
  const missingSide = isExterior ? "interieur" : "exterieur";
  const missingLabel = isExterior ? "binnenkant" : "buitenkant";
  const chosenLabel = isExterior ? "buitenkant" : "binnenkant";

  const points = isExterior
    ? [
        "Een glanzende buitenkant valt harder op als het interieur fris meekomt",
        "Stoelen, vloer en dashboard krijgen dezelfde aandacht als de lak",
        "U zit meteen in een schone auto, niet alleen ernaast",
      ]
    : [
        "Een fris interieur verdient een buitenkant die erbij past",
        "Velgen, lak en ramen maken het plaatje compleet",
        "Eén bezoek, binnen en buiten klaar, zonder tweede planning",
      ];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-accent/40 bg-accent/8">
        <div className="relative h-36 w-full">
          <Image
            src="/options/full.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
          <p className="absolute bottom-3 left-4 right-4 text-sm font-medium text-white">
            Full detail. Binnen en buiten in één keer.
          </p>
        </div>

        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            Maak het compleet
          </p>
          <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
            Alleen de {chosenLabel} voelt half
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            U koos {primaryName.toLowerCase()}. De {missingLabel} blijft dan
            zichtbaar en voelbaar. Met full detail krijgt u beide kanten voor{" "}
            {formatPrice(150)}. Los boeken kost {formatPrice(170)}. U bespaart{" "}
            {formatPrice(savings)} en mist niets.
          </p>

          <ul className="mt-4 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-snug">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={onAccept}
        className="pressable inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink"
      >
        Ja, full detail voor {formatPrice(150)}
      </button>
      <button
        type="button"
        onClick={onSkip}
        className="pressable inline-flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium"
      >
        Nee, alleen {primaryName.toLowerCase()}
      </button>
      <p className="text-center text-xs text-muted">
        U kunt later alsnog extras toevoegen, zoals {missingSide === "interieur" ? "geur of leer" : "koplampen of insecten"}.
      </p>
    </div>
  );
}

export function BookingDeepLink() {
  const { openBooking } = useBooking();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dienst = params.get("dienst");
    if (isBookableId(dienst)) {
      openBooking({ dienst });
    }
  }, [openBooking]);

  return null;
}
