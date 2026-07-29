export const SITE = {
  name: "Van Dijk-Bosma",
  fullName: "Van Dijk-Bosma Auto's",
  legalName: "Van Dijk-Bosma Auto's V.O.F.",
  tagline: "Professionele autodetailing aan huis",
  description:
    "Mobiele autodetailing in Noord-Nederland. Wij komen bij u langs voor exterieur, interieur of een complete full detail, met professionele producten en persoonlijke service.",
  url: "https://vandijk-bosma.nl",
  email: "Contact@VanDijk-Bosma.com",
  phoneSven: "+31642019318",
  phoneJeremy: "+31621683740",
  phoneSvenDisplay: "+31 6 42019318",
  phoneJeremyDisplay: "+31 6 21683740",
  address: {
    street: "Schermerhornring 92",
    postalCode: "9602TS",
    city: "Hoogezand",
    region: "Groningen",
    country: "NL",
  },
  owners: ["Sven van Dijk", "Jeremy Bosma"],
  area: [
    "Hoogezand-Sappemeer",
    "Groningen",
    "Veendam",
    "Assen",
    "Winschoten",
    "Haren",
    "Zuidlaren",
    "Delfzijl",
  ],
} as const;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: SITE.fullName,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneSven,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.area.map((city) => ({
      "@type": "City",
      name: city,
    })),
    priceRange: "€€",
  };
}
