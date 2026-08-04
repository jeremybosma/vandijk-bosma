export type PackageId = "exterieur" | "interieur" | "full" | "abonnement";
export type AddonId =
  | "koplampen"
  | "motorruimte"
  | "leer"
  | "insecten"
  | "geur";
export type BookableId = PackageId | AddonId;

export type CatalogItem = {
  id: BookableId;
  name: string;
  description: string;
  image: string;
  durationLabel: string;
  kind: "package" | "addon";
  price: number;
  priceSuffix?: string;
  soloPrice?: number;
  packagePrice?: number;
  highlights?: string[];
};

export const PACKAGES: CatalogItem[] = [
  {
    id: "exterieur",
    kind: "package",
    name: "Exterieur detail",
    price: 70,
    durationLabel: "ca. 1 uur",
    description: "Lak, velgen, banden, wielkasten, ramen en kunststof.",
    image: "/options/exterieur.jpg",
    highlights: ["Velgen & banden", "Veilige wasbeurt", "Ramen & spiegels"],
  },
  {
    id: "interieur",
    kind: "package",
    name: "Interieur detail",
    price: 100,
    durationLabel: "ca. 1 uur",
    description: "Stoelen, vloer, dashboard, panelen en kofferbak.",
    image: "/options/interieur.jpg",
    highlights: ["Stoelen & vloer", "Dashboard & panelen", "Frisse finish"],
  },
  {
    id: "full",
    kind: "package",
    name: "Full detail",
    price: 150,
    durationLabel: "ca. 2 uur",
    description: "Complete behandeling binnen en buiten.",
    image: "/options/full.jpg",
    highlights: [
      "Exterieur + interieur",
      "Complete verzorging",
      "Beste prijs/kwaliteit",
    ],
  },
  {
    id: "abonnement",
    kind: "package",
    name: "Full detail abonnement",
    price: 80,
    priceSuffix: "/ maand",
    durationLabel: "1× per maand · min. 6 maanden",
    description: "Maandelijks full detail bij u thuis.",
    image: "/options/abonnement.jpg",
    highlights: [
      "Full detail elke maand",
      "Maandelijks betalen",
      "Minimaal 6 maanden",
    ],
  },
];

export type AddonItem = CatalogItem & {
  id: AddonId;
  kind: "addon";
  soloPrice: number;
  packagePrice: number;
};

export const ADDONS: AddonItem[] = [
  {
    id: "koplampen",
    kind: "addon",
    name: "Koplampen polijsten",
    price: 80,
    soloPrice: 80,
    packagePrice: 60,
    durationLabel: "ca. 45 min",
    description: "Matte of vergeelde koplampen weer helder.",
    image: "/options/koplampen.jpg",
  },
  {
    id: "motorruimte",
    kind: "addon",
    name: "Motorruimte reinigen",
    price: 45,
    soloPrice: 45,
    packagePrice: 35,
    durationLabel: "ca. 30 min",
    description: "Veilige reiniging van de motorruimte.",
    image: "/options/motorruimte.jpg",
  },
  {
    id: "leer",
    kind: "addon",
    name: "Leerconditioner intensief",
    price: 40,
    soloPrice: 40,
    packagePrice: 30,
    durationLabel: "ca. 25 min",
    description: "Voeding en bescherming voor leder.",
    image: "/options/leer.jpg",
  },
  {
    id: "insecten",
    kind: "addon",
    name: "Insecten en teer verwijderen",
    price: 40,
    soloPrice: 40,
    packagePrice: 30,
    durationLabel: "ca. 30 min",
    description: "Hardnekkige resten veilig van de lak.",
    image: "/options/insecten.jpg",
  },
  {
    id: "geur",
    kind: "addon",
    name: "Geurbehandeling",
    price: 35,
    soloPrice: 35,
    packagePrice: 25,
    durationLabel: "ca. 20 min",
    description: "Frisse, neutrale geur in het interieur.",
    image: "/options/geur.jpg",
  },
];

export const PRIMARY_OPTIONS: CatalogItem[] = [...PACKAGES, ...ADDONS];

export const EXTERIEUR = PACKAGES.find((item) => item.id === "exterieur")!;
export const INTERIEUR = PACKAGES.find((item) => item.id === "interieur")!;
export const FULL = PACKAGES.find((item) => item.id === "full")!;

export function formatPrice(price: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceFrom(price: number) {
  return `vanaf ${formatPrice(price)}`;
}

export function getCatalogItem(id: BookableId) {
  return PRIMARY_OPTIONS.find((item) => item.id === id);
}

export function isPackageId(id: BookableId): id is PackageId {
  return PACKAGES.some((item) => item.id === id);
}

export function isAddonId(id: BookableId): id is AddonId {
  return ADDONS.some((item) => item.id === id);
}

export function isBookableId(value: string | null): value is BookableId {
  return Boolean(value && PRIMARY_OPTIONS.some((item) => item.id === value));
}

export function usesPackageAddonPricing(primaryId: BookableId | null) {
  return primaryId != null && isPackageId(primaryId);
}

export function addonPriceFor(
  addon: CatalogItem,
  primaryId: BookableId | null,
) {
  if (usesPackageAddonPricing(primaryId)) {
    return addon.packagePrice ?? addon.price;
  }
  return addon.soloPrice ?? addon.price;
}

export function addonSavings(addon: CatalogItem) {
  const solo = addon.soloPrice ?? addon.price;
  const pack = addon.packagePrice ?? addon.price;
  return Math.max(0, solo - pack);
}

export function fullUpsellSavings() {
  return EXTERIEUR.price + INTERIEUR.price - FULL.price;
}

export function calculateTotal(
  primaryId: BookableId | null,
  addonIds: AddonId[],
) {
  if (!primaryId) return 0;
  const primary = getCatalogItem(primaryId);
  if (!primary) return 0;

  let total = primary.price;
  for (const addonId of addonIds) {
    if (addonId === primaryId) continue;
    const addon = getCatalogItem(addonId);
    if (!addon || addon.kind !== "addon") continue;
    total += addonPriceFor(addon, primaryId);
  }
  return total;
}

/** Legacy aliases used by marketing pages */
export type ServiceId = PackageId;
export const SERVICES = PACKAGES.filter((item) => item.id !== "abonnement");
export const SUBSCRIPTION = PACKAGES.find((item) => item.id === "abonnement")!;
export const BOOKABLE_SERVICES = PACKAGES;

export function getService(id: ServiceId) {
  return PACKAGES.find((item) => item.id === id);
}
