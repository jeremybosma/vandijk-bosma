import { SectionHeading } from "@/components/section-heading";
import { WerkgebiedMap } from "@/components/werkgebied-map";
import { SITE } from "@/lib/site";

export function Werkgebied() {
  return (
    <section id="werkgebied" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <SectionHeading
          icon="Mappin"
          eyebrow="Werkgebied"
          title="Actief in Noord-Nederland"
          description={
            <>
              Gevestigd in {SITE.address.city}. In de opstartfase bedienen wij
              Groningen, Drenthe en omliggende plaatsen. Twijfelt u of wij bij u
              kunnen komen? Neem contact op.
            </>
          }
        />

        <WerkgebiedMap />
      </div>
    </section>
  );
}
