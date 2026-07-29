import { Abonnement } from "@/components/abonnement";
import { Booking } from "@/components/booking";
import { Diensten } from "@/components/diensten";
import { Hero } from "@/components/hero";
import { OverOns } from "@/components/over-ons";
import { Werkgebied } from "@/components/werkgebied";
import { Werkwijze } from "@/components/werkwijze";
import { Zakelijk } from "@/components/zakelijk";
import { localBusinessJsonLd } from "@/lib/site";

export default function HomePage() {
  const jsonLd = localBusinessJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Diensten />
      <Abonnement />
      <Werkwijze />
      <Booking />
      <Zakelijk />
      <Werkgebied />
      <OverOns />
    </>
  );
}
