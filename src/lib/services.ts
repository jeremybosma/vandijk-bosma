export type ServiceId = "exterieur" | "interieur" | "full" | "abonnement";

export type Service = {
  id: ServiceId;
  name: string;
  price: number;
  durationLabel: string;
  description: string;
  highlights: string[];
  priceSuffix?: string;
};

export const SERVICES: Service[] = [
  {
    id: "exterieur",
    name: "Exterieur detail",
    price: 70,
    durationLabel: "ca. 1 uur",
    description:
      "Grondige reiniging van de buitenzijde: lak, velgen, banden, wielkasten, ramen en kunststof.",
    highlights: ["Velgen & banden", "Veilige wasbeurt", "Ramen & spiegels"],
  },
  {
    id: "interieur",
    name: "Interieur detail",
    price: 100,
    durationLabel: "ca. 1 uur",
    description:
      "Diepe reiniging van stoelen, vloerbekleding, dashboard, deurpanelen, kofferbak en ventilatie.",
    highlights: ["Stoelen & vloer", "Dashboard & panelen", "Frisse finish"],
  },
  {
    id: "full",
    name: "Full detail",
    price: 150,
    durationLabel: "ca. 2 uur",
    description:
      "Complete behandeling binnen én buiten. Het meest gekozen pakket voor een showroomwaardig resultaat.",
    highlights: ["Exterieur + interieur", "Complete verzorging", "Beste prijs/kwaliteit"],
  },
];

export const SUBSCRIPTION: Service = {
  id: "abonnement",
  name: "Full detail abonnement",
  price: 80,
  priceSuffix: "/ maand",
  durationLabel: "1× per maand · min. 6 maanden",
  description:
    "Maandelijks een full detail bij u thuis. Voor particulieren die hun auto structureel verzorgd willen houden.",
  highlights: [
    "Full detail elke maand",
    "Maandelijks betalen",
    "Minimaal 6 maanden",
  ],
};

export const BOOKABLE_SERVICES: Service[] = [...SERVICES, SUBSCRIPTION];

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

export function getService(id: ServiceId) {
  return BOOKABLE_SERVICES.find((service) => service.id === id);
}
